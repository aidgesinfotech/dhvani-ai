import { ImagePlus } from 'lucide-react';

/**
 * Renders the CMS image when `src` is set, otherwise a branded placeholder
 * showing the intended image description so content teams know what to upload.
 */
export function ImagePlaceholder({
  src,
  label,
  className = '',
  ratio = 'aspect-[4/3]',
  alt,
}: {
  src?: string | null;
  label?: string | null;
  className?: string;
  ratio?: string;
  alt?: string;
}) {
  if (src) {
    return (
      <div className={`relative overflow-hidden rounded-[1.25rem] border border-line ${ratio} ${className}`}>
        <img src={src} alt={alt || label || ''} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
      </div>
    );
  }
  return (
    <div className={`img-placeholder ${ratio} ${className}`} role="img" aria-label={label || 'Image placeholder'}>
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 text-center">
        <span className="relative inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-gold/30 bg-black/50 text-gold">
          <span className="absolute inset-0 rounded-2xl border border-royal-light/40 pulse-ring" />
          <ImagePlus size={22} strokeWidth={1.6} />
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold/80">Image placeholder</span>
        {label && <span className="max-w-[18rem] text-sm text-fg-2 leading-snug">{label}</span>}
      </div>
    </div>
  );
}
