import Link from 'next/link';

export const metadata = { title: 'Page not found' };

export default function NotFound() {
  return (
    <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center flex flex-col items-center gap-5">
      <span className="font-sans text-xs font-bold uppercase tracking-widest text-primary">Error 404</span>
      <h1 className="font-display font-bold text-4xl text-on-surface">We couldn&apos;t find that page.</h1>
      <p className="text-sm text-on-surface-variant max-w-md">
        The link may be out of date, or the product may no longer be in the catalog.
      </p>
      <div className="flex flex-wrap gap-3 justify-center">
        <Link href="/catalog" className="px-6 py-3 rounded-full bg-primary text-on-primary font-display text-sm font-bold hover:bg-primary-container transition-colors">
          Browse the store
        </Link>
        <Link href="/" className="px-6 py-3 rounded-full bg-surface-container-high text-on-surface font-display text-sm font-bold hover:bg-surface-container transition-colors">
          Back home
        </Link>
      </div>
    </section>
  );
}
