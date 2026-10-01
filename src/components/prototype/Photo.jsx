import Image from 'next/image';

/**
 * Responsive photo that fills its (relatively positioned) parent.
 * When `src` is missing it renders a neutral tile so layouts hold their shape
 * until the real photo is supplied.
 */
export default function Photo({ src, alt = '', sizes = '100vw', priority = false, className = '', position = 'center', label = 'Photo coming soon', icon = 'photo_camera' }) {
  if (!src) {
    return (
      <div
        role="img"
        aria-label={alt || label}
        className={`absolute inset-0 flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-surface-container-high to-surface-container text-on-surface-variant ${className}`}
      >
        <span className="material-symbols-outlined text-[28px] opacity-60">{icon}</span>
        <span className="text-[11px] font-semibold uppercase tracking-widest opacity-70">{label}</span>
      </div>
    );
  }
  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      className={`object-cover ${className}`}
      style={{ objectPosition: position }}
    />
  );
}
