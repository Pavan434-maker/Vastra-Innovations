import { useState } from 'react';
import { Layers } from 'lucide-react';

interface FabricImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackTitle?: string;
}

export function FabricImage({
  src,
  alt,
  className = '',
  fallbackTitle,
}: FabricImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-[#EDE6D8] text-[#0F1F3D]/70 p-6 text-center ${className}`}
        role="img"
        aria-label={alt}
      >
        <Layers className="w-7 h-7 mb-2 text-[#1B4D3E]/70" strokeWidth={1.5} />
        <span className="text-xs font-medium tracking-wide text-[#0F1F3D]/80 line-clamp-2">
          {fallbackTitle || alt}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={`object-cover ${className}`}
    />
  );
}
