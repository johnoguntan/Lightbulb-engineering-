import Link from 'next/link';
import Photo from './Photo';
import SubscribeForm from './SubscribeForm';
import SignatureGrid from '../home/SignatureGrid';
import { HERO, PILLARS, SIGNATURE, CATEGORIES_SECTION, LIFESTYLE_BAND, B2B, PHILOSOPHY, COMMUNITY, NEWSLETTER } from '@/content/site';
import { CATEGORY_TILES } from '@/data/products';

const wrap = 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full';

function Eyebrow({ children, dot = false, className = '' }) {
  return (
    <p className={`inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-primary ${className}`}>
      {dot && <span className="w-1.5 h-1.5 rounded-full bg-primary" aria-hidden="true" />}
      {children}
    </p>
  );
}

function Hero() {
  return (
    <section className={`${wrap} pt-10 pb-16 md:pt-16 md:pb-24`}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        <div className="lg:col-span-6 xl:col-span-7 flex flex-col items-start">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-fixed text-on-primary-fixed-variant text-[11px] font-bold uppercase tracking-wider mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" aria-hidden="true" />
            {HERO.eyebrow}
          </span>
          <h1 className="font-display font-medium text-5xl sm:text-6xl lg:text-[3.6rem] xl:text-7xl tracking-tight text-on-surface leading-[1.02] mb-6">
            {HERO.titleStart} <em className="font-bold italic text-primary">{HERO.titleAccent}</em>
            <br />
            {HERO.titleEnd}
          </h1>
          <p className="text-lg text-on-surface-variant max-w-xl mb-8 leading-relaxed">{HERO.body}</p>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href={HERO.primaryCta.href}
              className="px-7 py-4 rounded-full bg-primary text-on-primary font-display text-sm font-bold shadow-md hover:bg-primary-container transition-colors inline-flex items-center gap-2"
            >
              {HERO.primaryCta.label}
              <span className="material-symbols-outlined text-[18px]">arrow_downward</span>
            </Link>
            <Link
              href={HERO.secondaryCta.href}
              className="px-7 py-4 rounded-full bg-surface-container-high text-on-surface font-display text-sm font-bold hover:bg-surface-dim transition-colors inline-flex items-center gap-2"
            >
              {HERO.secondaryCta.label}
              <span className="material-symbols-outlined text-[18px]">inventory_2</span>
            </Link>
          </div>
          <dl className="grid grid-cols-3 gap-6 sm:gap-10 mt-12 w-full max-w-lg">
            {HERO.stats.map((s) => (
              <div key={s.label}>
                <dt className="sr-only">{s.label}</dt>
                <dd className={`font-display text-2xl font-bold ${s.accent ? 'text-primary' : 'text-on-surface'}`}>{s.value}</dd>
                <dd className="text-[10px] font-semibold uppercase tracking-widest text-on-surface-variant mt-1">{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="lg:col-span-6 xl:col-span-5">
          <div className="relative aspect-[4/5] sm:aspect-[5/4] lg:aspect-[4/5] xl:aspect-[5/5] rounded-[2rem] overflow-hidden shadow-xl bg-surface-container">
            <Photo src={HERO.image} alt={HERO.imageAlt} priority sizes="(min-width:1024px) 45vw, 100vw" position={HERO.imagePosition} />
            <div className="absolute top-4 left-4 right-4 flex flex-wrap gap-2">
              {HERO.badges.map((b, i) => (
                <span key={b} className="px-3 py-1.5 rounded-full bg-surface/90 backdrop-blur text-[11px] font-semibold text-on-surface inline-flex items-center gap-1.5 shadow-sm">
                  <span className="material-symbols-outlined text-[14px] text-primary">{i === 0 ? 'verified' : 'recycling'}</span>
                  {b}
                </span>
              ))}
            </div>
            <div className="absolute bottom-0 inset-x-0 p-5 bg-gradient-to-t from-black/60 to-transparent flex items-end justify-between text-white">
              <span className="inline-flex items-center gap-2 text-sm font-bold">
                <span className="material-symbols-outlined text-[18px]">shield</span>
                {HERO.caption}
              </span>
              <Link href={HERO.shopLook} className="px-3 py-1.5 rounded-full bg-white/15 backdrop-blur text-[11px] font-semibold hover:bg-white/25 transition-colors">
                Shop the look →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Pillars() {
  return (
    <section className="bg-surface-bright py-16 md:py-24 border-y border-outline-variant/40">
      <div className={wrap}>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <Eyebrow>{PILLARS.eyebrow}</Eyebrow>
            <h2 className="font-display font-medium text-3xl sm:text-4xl text-on-surface mt-2">{PILLARS.title}</h2>
          </div>
          <p className="text-sm text-on-surface-variant max-w-md">{PILLARS.intro}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PILLARS.cards.map((c) => (
            <article
              key={c.title}
              className={`rounded-[2rem] p-6 sm:p-8 flex flex-col gap-6 border border-outline-variant/50 ${c.tone === 'muted' ? 'bg-surface-container' : 'bg-surface-container-low'}`}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="inline-block px-3 py-1 rounded-full bg-primary-fixed text-on-primary-fixed-variant text-[10px] font-bold uppercase tracking-wider">{c.badge}</span>
                  <h3 className="font-display font-medium text-2xl sm:text-3xl text-on-surface mt-4">{c.title}</h3>
                  <p className="text-sm text-on-surface-variant mt-2 max-w-md leading-relaxed">{c.body}</p>
                </div>
                <span className="material-symbols-outlined text-[24px] text-on-surface">{c.icon}</span>
              </div>
              <Link href={c.cta.href} className="relative block aspect-[16/10] rounded-2xl overflow-hidden bg-surface-container-high group">
                <Photo src={c.image} alt={c.imageAlt} sizes="(min-width:768px) 45vw, 100vw" className="transition-transform duration-700 group-hover:scale-[1.03]" />
              </Link>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <Link
                  href={c.cta.href}
                  className={`px-5 py-3 rounded-full font-display text-sm font-bold inline-flex items-center gap-2 transition-colors ${
                    c.tone === 'muted' ? 'bg-primary text-on-primary hover:bg-primary-container' : 'bg-on-surface text-surface hover:bg-inverse-surface'
                  }`}
                >
                  {c.cta.label}
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </Link>
                <span className="text-[11px] text-on-surface-variant">{c.note}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Categories() {
  return (
    <section className={`${wrap} pt-16 md:pt-24`}>
      <Eyebrow dot>{CATEGORIES_SECTION.eyebrow}</Eyebrow>
      <h2 className="font-display font-medium text-3xl sm:text-4xl text-on-surface mt-2 mb-8">{CATEGORIES_SECTION.title}</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {CATEGORY_TILES.map((c, i) => (
          <Link
            key={c.name}
            href={`/catalog?category=${encodeURIComponent(c.name)}`}
            className="group relative aspect-[3/4] rounded-3xl overflow-hidden bg-surface-container"
          >
            <Photo
              src={c.image}
              alt=""
              sizes="(min-width:1024px) 16vw, (min-width:768px) 33vw, 50vw"
              position={c.position}
              priority={i < 2}
              className="transition-transform duration-700 group-hover:scale-[1.05]"
            />
            <span className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/5 to-transparent" aria-hidden="true" />
            <span className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white font-display font-bold text-sm sm:text-base">
              {c.name}
              <span className="material-symbols-outlined text-[18px] transition-transform group-hover:translate-x-1">arrow_forward</span>
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

function Signature() {
  return (
    <section className={`${wrap} py-16 md:py-24`} id="shop">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div>
          <Eyebrow dot>{SIGNATURE.eyebrow}</Eyebrow>
          <h2 className="font-display font-medium text-3xl sm:text-4xl text-on-surface mt-2">{SIGNATURE.title}</h2>
          <p className="text-sm text-on-surface-variant mt-2">{SIGNATURE.intro}</p>
        </div>
        <Link href="/catalog" className="text-sm font-bold text-primary hover:underline inline-flex items-center gap-1">
          View all <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
        </Link>
      </div>
      <SignatureGrid />
    </section>
  );
}

function LifestyleBand() {
  return (
    <section className="relative w-full min-h-[70vh] md:min-h-[80vh] flex items-end overflow-hidden bg-inverse-surface">
      <Photo src={LIFESTYLE_BAND.image} alt={LIFESTYLE_BAND.imageAlt} sizes="100vw" position={LIFESTYLE_BAND.imagePosition} />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-black/10 lg:bg-gradient-to-l lg:from-black/75 lg:via-black/30 lg:to-transparent" aria-hidden="true" />
      <div className={`${wrap} relative py-12 md:py-20 text-white flex flex-col lg:items-end`}>
        <div className="lg:max-w-xl">
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary-fixed-dim">{LIFESTYLE_BAND.eyebrow}</p>
        <h2 className="font-display font-medium text-4xl sm:text-5xl lg:text-6xl mt-3 max-w-2xl leading-[1.05]">{LIFESTYLE_BAND.title}</h2>
        <p className="text-base sm:text-lg text-white/85 mt-4 max-w-xl">{LIFESTYLE_BAND.body}</p>
        <Link
          href={LIFESTYLE_BAND.cta.href}
          className="mt-8 inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white text-on-surface font-display text-sm font-bold hover:bg-surface-container-high transition-colors"
        >
          {LIFESTYLE_BAND.cta.label}
          <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
        </Link>
        </div>
      </div>
    </section>
  );
}

function B2bFeature() {
  return (
    <section className={`${wrap} py-16 md:py-24`}>
      <div className="rounded-[2rem] bg-surface-container p-6 sm:p-10 lg:p-12 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center border border-outline-variant/50">
        <div>
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-on-surface text-surface text-[10px] font-bold uppercase tracking-wider">
            <span className="material-symbols-outlined text-[14px]">factory</span>
            {B2B.badge}
          </span>
          <h2 className="font-display font-medium text-3xl sm:text-4xl text-on-surface mt-5 leading-tight">{B2B.title}</h2>
          <p className="text-sm text-on-surface-variant mt-3 max-w-lg leading-relaxed">{B2B.body}</p>

          <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mt-8 mb-3">{B2B.tiersLabel}</p>
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            {B2B.tiers.map((t) => (
              <div
                key={t.qty}
                className={`rounded-2xl p-3 sm:p-4 ${t.highlight ? 'bg-primary text-on-primary shadow-md' : 'bg-surface-container-lowest text-on-surface'}`}
              >
                <p className={`text-[10px] sm:text-[11px] ${t.highlight ? 'text-on-primary/80' : 'text-on-surface-variant'}`}>{t.qty}</p>
                <p className="font-display font-bold text-lg sm:text-2xl mt-1">{t.price}</p>
                <p className={`text-[10px] mt-0.5 ${t.highlight ? 'text-on-primary/80' : 'text-primary'}`}>{t.note}</p>
              </div>
            ))}
          </div>

          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 mt-6 text-sm text-on-surface-variant">
            {B2B.features.map((f) => (
              <li key={f} className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-primary">check_circle</span>
                {f}
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-3 mt-8">
            <Link href={B2B.primaryCta.href} className="px-5 py-3 rounded-full bg-on-surface text-surface font-display text-sm font-bold inline-flex items-center gap-2 hover:bg-inverse-surface transition-colors">
              <span className="material-symbols-outlined text-[18px]">package_2</span>
              {B2B.primaryCta.label}
            </Link>
            <Link href={B2B.secondaryCta.href} className="px-5 py-3 rounded-full bg-surface-container-lowest text-on-surface font-display text-sm font-bold inline-flex items-center gap-2 hover:bg-surface-container-high transition-colors">
              <span className="material-symbols-outlined text-[18px]">upload_file</span>
              {B2B.secondaryCta.label}
            </Link>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-surface-container-high shadow-lg">
            <Photo src={B2B.image} alt={B2B.imageAlt} sizes="(min-width:1024px) 45vw, 100vw" position={B2B.imagePosition} label="Packaging photo coming soon" icon="package_2" />
            <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:max-w-xs p-4 rounded-2xl bg-surface/95 backdrop-blur shadow-md">
              <p className="text-[10px] font-bold uppercase tracking-widest text-primary">{B2B.callout.label}</p>
              <p className="text-xs text-on-surface mt-1 leading-relaxed">{B2B.callout.body}</p>
            </div>
          </div>
          {B2B.gallery?.length > 0 && (
            <div className="grid grid-cols-4 gap-3">
              {B2B.gallery.map((g) => (
                <div key={g.src} className="relative aspect-square rounded-2xl overflow-hidden bg-surface-container-high">
                  <Photo src={g.src} alt={g.alt} sizes="(min-width:1024px) 11vw, 25vw" />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function Philosophy() {
  return (
    <section className="bg-surface-container-low py-16 md:py-24 border-y border-outline-variant/40">
      <div className={wrap}>
        <div className="text-center max-w-2xl mx-auto mb-12">
          <Eyebrow>{PHILOSOPHY.eyebrow}</Eyebrow>
          <h2 className="font-display font-medium text-3xl sm:text-4xl text-on-surface mt-2">{PHILOSOPHY.title}</h2>
          <p className="text-sm text-on-surface-variant mt-3 leading-relaxed">{PHILOSOPHY.body}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PHILOSOPHY.cards.map((c) => (
            <article key={c.title} className="bg-surface-container-lowest rounded-3xl p-7 border border-outline-variant/50 flex flex-col">
              <span className="w-11 h-11 rounded-xl bg-primary-fixed text-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-[22px]">{c.icon}</span>
              </span>
              <h3 className="font-display font-bold text-lg text-on-surface mt-5">{c.title}</h3>
              <p className="text-sm text-on-surface-variant mt-2 leading-relaxed flex-1">{c.body}</p>
              <Link href={c.link.href} className="text-xs font-bold text-primary mt-5 hover:underline">
                {c.link.label} →
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Community() {
  const [lead, ...rest] = COMMUNITY.photos;
  return (
    <section className={`${wrap} py-16 md:py-24`}>
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-8">
        <div>
          <Eyebrow>{COMMUNITY.eyebrow}</Eyebrow>
          <h2 className="font-display font-medium text-2xl sm:text-3xl lg:text-4xl text-on-surface mt-2">{COMMUNITY.title}</h2>
        </div>
        <a href={COMMUNITY.link.href} target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-primary hover:underline inline-flex items-center gap-1">
          {COMMUNITY.link.label}
          <span className="material-symbols-outlined text-[16px]">north_east</span>
        </a>
      </div>

      {/* Editorial mosaic: one tall lead photo, the rest in a grid. */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        <div className="relative col-span-2 row-span-2 aspect-[4/5] md:aspect-auto rounded-3xl overflow-hidden bg-surface-container">
          <Photo src={lead.src} alt={lead.alt} sizes="(min-width:768px) 50vw, 100vw" position="50% 35%" />
        </div>
        {rest.slice(0, 4).map((p) => (
          <div key={p.src} className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-surface-container group">
            <Photo src={p.src} alt={p.alt} sizes="(min-width:768px) 25vw, 50vw" className="transition-transform duration-700 group-hover:scale-[1.04]" />
          </div>
        ))}
        {rest.slice(4, 6).map((p) => (
          <div key={p.src} className="relative col-span-2 aspect-[3/2] rounded-3xl overflow-hidden bg-surface-container group">
            <Photo src={p.src} alt={p.alt} sizes="(min-width:768px) 50vw, 100vw" className="transition-transform duration-700 group-hover:scale-[1.04]" />
          </div>
        ))}
      </div>

      {COMMUNITY.testimonials.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          {COMMUNITY.testimonials.map((t) => (
            <figure key={t.name} className="rounded-3xl bg-surface-container-low p-6 border border-outline-variant/40">
              <blockquote className="text-sm text-on-surface leading-relaxed">&ldquo;{t.quote}&rdquo;</blockquote>
              <figcaption className="mt-4 text-xs">
                <span className="font-bold text-on-surface block">{t.name}</span>
                <span className="text-on-surface-variant">{t.role}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      )}

      <div className="mt-10 rounded-3xl bg-primary-fixed px-6 py-8 sm:px-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <h2 className="font-display font-bold text-xl text-on-primary-fixed">{NEWSLETTER.title}</h2>
          <p className="text-sm text-on-primary-fixed-variant mt-1">{NEWSLETTER.body}</p>
        </div>
        <div className="w-full lg:max-w-md">
          <SubscribeForm placeholder={NEWSLETTER.placeholder} cta={NEWSLETTER.cta} source="home-circle" tone="dark" />
        </div>
      </div>
    </section>
  );
}

export default function HomeView() {
  return (
    <>
      <Hero />
      <Pillars />
      <Categories />
      <Signature />
      <LifestyleBand />
      <B2bFeature />
      <Philosophy />
      <Community />
    </>
  );
}
