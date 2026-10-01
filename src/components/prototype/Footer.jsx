import Link from 'next/link';
import SubscribeForm from './SubscribeForm';
import { FOOTER } from '@/content/site';

export default function Footer() {
  return (
    <footer className="w-full bg-surface-container-low text-on-surface pt-16 pb-10 border-t border-outline-variant/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-6 lg:grid-cols-12 gap-10 mb-14">
          <div className="col-span-2 md:col-span-6 lg:col-span-3">
            <Link href="/" className="inline-flex items-center gap-3 mb-4 group" aria-label="Lightbulb Engineering home">
              <span className="w-9 h-9 rounded-xl bg-primary text-on-primary flex items-center justify-center shadow-md">
                <span className="material-symbols-outlined text-[20px]">lightbulb</span>
              </span>
              <span className="font-display font-bold text-xl tracking-tight group-hover:text-primary transition-colors">LIGHTBULB</span>
            </Link>
            <p className="text-sm text-on-surface-variant leading-relaxed max-w-sm">{FOOTER.blurb}</p>
            <ul className="mt-6 space-y-2">
              {FOOTER.badges.map((b) => (
                <li key={b.label} className="flex items-center gap-2 text-xs font-semibold text-on-surface">
                  <span className="material-symbols-outlined text-[18px] text-primary">{b.icon}</span>
                  {b.label}
                </li>
              ))}
            </ul>
          </div>

          {FOOTER.columns.map((col) => (
            <nav key={col.title} aria-label={col.title} className="col-span-1 md:col-span-2 lg:col-span-2">
              <h3 className="font-display text-[11px] font-bold tracking-widest uppercase mb-4">{col.title}</h3>
              <ul className="space-y-2.5 text-sm text-on-surface-variant">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="hover:text-primary transition-colors">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div className="col-span-2 md:col-span-2 lg:col-span-2">
            <h3 className="font-display text-[11px] font-bold tracking-widest uppercase mb-4">{FOOTER.studio.title}</h3>
            <address className="not-italic text-sm text-on-surface-variant space-y-1">
              <p className="font-semibold text-on-surface">{FOOTER.studio.name}</p>
              {FOOTER.studio.address.map((line) => (
                <p key={line}>{line}</p>
              ))}
              <p className="pt-2">{FOOTER.studio.hours}</p>
            </address>
          </div>

          <div className="col-span-2 md:col-span-4 lg:col-span-3">
            <h3 className="font-display text-[11px] font-bold tracking-widest uppercase mb-4">{FOOTER.dispatches.title}</h3>
            <p className="text-sm text-on-surface-variant mb-4 leading-relaxed">{FOOTER.dispatches.body}</p>
            <SubscribeForm source="footer" />
            <p className="text-[11px] text-on-surface-variant">{FOOTER.dispatches.fine}</p>
          </div>
        </div>

        <div className="pt-8 border-t border-outline-variant/60 flex flex-col md:flex-row items-center justify-between text-xs text-on-surface-variant gap-4">
          <p>© {new Date().getFullYear()} Lightbulb Engineering Limited. All rights reserved.</p>
          <nav aria-label="Legal" className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <Link href="/b2b" className="hover:text-on-surface transition-colors">Terms of Wholesale</Link>
            <Link href="/craft" className="hover:text-on-surface transition-colors">Compliance &amp; Materials</Link>
            <Link href="/catalog" className="hover:text-on-surface transition-colors">Shop</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
