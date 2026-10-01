import Link from 'next/link';
import Photo from './Photo';
import { PRODUCTS } from '@/data/products';

export default function CompareView() {
  const rows = [
    { label: 'Type', get: (p) => p.categoryLabel },
    { label: 'Colours', get: (p) => p.colours.map((c) => c.name).join(', ') },
    { label: 'Price', get: (p) => p.formattedPrice },
    { label: 'About', get: (p) => p.description },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
      <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary">Side by side</p>
      <h1 className="font-display font-medium text-4xl text-on-surface mt-2 mb-8">Compare the range</h1>
      <div className="overflow-x-auto rounded-3xl border border-outline-variant/60 bg-surface-container-lowest">
        <table className="w-full min-w-[720px] text-sm">
          <thead>
            <tr>
              <th scope="col" className="p-5 text-left w-32 text-xs uppercase tracking-wider text-on-surface-variant">Product</th>
              {PRODUCTS.map((p) => (
                <th key={p.slug} scope="col" className="p-5 text-left align-top">
                  <Link href={`/catalog/${p.slug}`} className="group block">
                    <span className="relative block aspect-[4/5] rounded-2xl overflow-hidden bg-surface-container mb-3">
                      <Photo src={p.images[0]} alt={p.name} sizes="200px" />
                    </span>
                    <span className="font-display font-bold text-on-surface group-hover:text-primary">{p.name}</span>
                  </Link>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.label} className="border-t border-outline-variant/40">
                <th scope="row" className="p-5 text-left text-xs uppercase tracking-wider text-on-surface-variant font-semibold">{r.label}</th>
                {PRODUCTS.map((p) => (
                  <td key={p.slug} className="p-5 align-top text-on-surface">{r.get(p)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
