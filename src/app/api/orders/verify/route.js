import { createClient } from '@supabase/supabase-js';
import { findProductBySlug } from '@/data/products';

/**
 * POST /api/orders/verify
 * Called by checkout after Paystack's popup reports success.
 * 1. Re-checks the payment with Paystack using the SECRET key (never trust the browser).
 * 2. Re-prices the bag from our own catalogue and confirms the amount paid matches.
 * 3. Saves the order to Supabase (linked to the customer if they're signed in).
 *
 * Needs server-only env vars: PAYSTACK_SECRET_KEY, SUPABASE_SERVICE_ROLE_KEY
 * (plus NEXT_PUBLIC_SUPABASE_URL). Without them it answers 503 and checkout
 * still shows the customer their confirmation.
 */

const FREE_SHIPPING_THRESHOLD = 50000;
const COURIER_FEE = 3500;

function bad(status, error) {
  return Response.json({ ok: false, error }, { status });
}

export async function POST(request) {
  const secret = process.env.PAYSTACK_SECRET_KEY;
  const sbUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!secret || !sbUrl || !serviceKey) return bad(503, 'Order saving is not configured yet.');

  let body;
  try {
    body = await request.json();
  } catch {
    return bad(400, 'Invalid request.');
  }
  const { reference, items, delivery } = body || {};
  if (typeof reference !== 'string' || !/^[A-Za-z0-9_-]{6,64}$/.test(reference)) return bad(400, 'Invalid reference.');
  if (!Array.isArray(items) || items.length === 0 || items.length > 50) return bad(400, 'No items.');

  // Re-price every line from the catalogue.
  const lines = [];
  for (const i of items) {
    const product = findProductBySlug(String(i.slug));
    const qty = Math.max(1, Math.min(100, parseInt(i.quantity, 10) || 1));
    if (!product || product.price == null) return bad(400, `Item not available: ${i.slug}`);
    const colour = product.colours.find((c) => c.name === i.colour)?.name || product.colours[0].name;
    lines.push({
      slug: product.slug,
      name: product.name,
      colour,
      monogram: String(i.monogram || '').slice(0, 6).toUpperCase(),
      quantity: qty,
      unit_price: product.price,
    });
  }
  const subtotal = lines.reduce((a, l) => a + l.unit_price * l.quantity, 0);
  const method = delivery?.method === 'pickup' ? 'pickup' : 'courier';
  const deliveryFee = method === 'pickup' || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : COURIER_FEE;
  const total = subtotal + deliveryFee;

  // Verify with Paystack.
  const psRes = await fetch(`https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`, {
    headers: { Authorization: `Bearer ${secret}` },
    cache: 'no-store',
  });
  const ps = await psRes.json().catch(() => null);
  const tx = ps?.data;
  if (!psRes.ok || !tx || tx.status !== 'success') return bad(402, 'Payment not confirmed by Paystack.');
  if (tx.currency !== 'NGN' || tx.amount !== total * 100) return bad(409, 'Amount paid does not match the order total.');

  const admin = createClient(sbUrl, serviceKey, { auth: { persistSession: false } });

  // Link to the signed-in customer, if a valid access token was sent.
  let userId = null;
  const token = (request.headers.get('authorization') || '').replace(/^Bearer\s+/i, '');
  if (token) {
    const { data } = await admin.auth.getUser(token);
    userId = data?.user?.id || null;
  }

  const order = {
    reference,
    user_id: userId,
    email: tx.customer?.email || '',
    status: 'paid',
    items: lines,
    subtotal,
    delivery_fee: deliveryFee,
    total,
    delivery: {
      method,
      name: String(delivery?.name || '').slice(0, 120),
      phone: String(delivery?.phone || '').slice(0, 40),
      address: method === 'pickup' ? '' : String(delivery?.address || '').slice(0, 200),
      area: method === 'pickup' ? '' : String(delivery?.area || '').slice(0, 80),
    },
  };

  // Idempotent: the same reference is only ever stored once.
  const { error } = await admin.from('orders').upsert(order, { onConflict: 'reference', ignoreDuplicates: true });
  if (error) return bad(500, 'Payment confirmed, but the order could not be saved.');

  return Response.json({ ok: true, reference, total });
}
