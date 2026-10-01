'use client';

import { useState } from 'react';

export default function ImageWithFallback({ src, alt, className, icon = 'inventory_2', category = 'PRODUCT' }) {
  const [error, setError] = useState(false);

  if (error || !src) {
    return (
      <div className={`flex flex-col items-center justify-center bg-gradient-to-br from-surface-container-high via-surface-container to-surface-container-low p-6 text-center select-none ${className}`}>
        <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-3 border border-primary/20 shadow-sm">
          <span className="material-symbols-outlined text-[24px]">{icon}</span>
        </div>
        <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-primary mb-1">
          {category}
        </span>
        <span className="font-display font-bold text-xs text-on-surface line-clamp-1 max-w-[80%]">
          {alt || 'Lightbulb Product'}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt || 'Product image'}
      className={className}
      onError={() => setError(true)}
    />
  );
}
