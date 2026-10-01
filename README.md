# Lightbulb Engineering

Next.js 16 (App Router) + Tailwind 3 storefront for Lightbulb Engineering.

## How it fits together

- `src/app/layout.js` wraps every page in `SiteShell` (header, footer, bag drawer and the shared cart).
- `src/context/CartContext.js` holds the bag. It is saved in the browser (localStorage) so it survives page changes, reloads and syncs across tabs.
- `src/content/site.js` holds all homepage/header/footer copy (draft copy from the Stitch design — confirm with the client).
- `src/data/products.js` is the single source for products. Each colour has its own photos (studio first, lifestyle second); cards swap to the lifestyle shot on hover. Anything marked PLACEHOLDER is not client-supplied yet; `price: null` shows "Price coming soon" and blocks add-to-cart.
- Real product photos live in `public/images/lightbulb/` (resized/compressed copies of the originals in `public/images/products/`). Product pages at `/catalog/[slug]` are generated from it; unknown slugs return a 404.
- Views live in `src/components/prototype/*View.jsx`; each route's `page.js` just renders its view.

## Customer accounts (Supabase)

Sign up, sign in, password reset and the account dashboard (`/account`: orders, saved addresses, business quotes & reorders, profile & password) are built and switch on as soon as Supabase is configured. Until then the pages show a clear "not switched on yet" notice.

1. Create a free project at supabase.com.
2. **SQL Editor → New query**, paste `supabase/schema.sql`, click **Run**. This creates the `orders`, `addresses` and `quote_requests` tables with row-level security (customers only ever see their own data).
3. **Authentication → URL Configuration**: set Site URL to the live domain and add `https://YOURDOMAIN/account` and `https://YOURDOMAIN/account/reset-password` as redirect URLs (plus `http://localhost:3000/...` for local testing).
4. Optional: **Authentication → Providers → Google** to enable "Continue with Google".
5. Copy `.env.example` to `.env.local` and fill in the Supabase URL, anon key and service-role key.

### How orders get saved
After Paystack reports a successful payment, checkout calls `POST /api/orders/verify`. That route re-checks the payment with Paystack using `PAYSTACK_SECRET_KEY`, re-prices the bag from `src/data/products.js`, confirms the amounts match, and stores the order (linked to the customer if signed in). Order statuses (`paid → in_production → dispatched → delivered`) are updated by the team in the Supabase table editor and show in the customer's dashboard.

## Newsletter / sign-up forms

Set `NEXT_PUBLIC_SUBSCRIBE_ENDPOINT` to any URL that accepts a JSON POST `{ email, source }` (Formspree, a Supabase edge function, etc.). Without it the forms show "Sign-ups open soon".

## Payments

Checkout uses Paystack Inline. Set your **public** key to switch it on:

```
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=pk_live_xxx   # or pk_test_xxx while testing
```

Without it the checkout form works but the pay button stays disabled with a notice.
Before going live, add a server route/webhook that verifies each transaction with your Paystack **secret** key — the browser callback alone should not be trusted to mark an order as paid.

---

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
