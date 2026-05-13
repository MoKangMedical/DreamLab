import Link from 'next/link';

interface BrandMarkProps {
  href?: string;
  compact?: boolean;
  className?: string;
}

export default function BrandMark({ href = '/', compact = false, className = '' }: BrandMarkProps) {
  return (
    <Link href={href} className={`brand-mark ${compact ? 'brand-mark-compact' : ''} ${className}`}>
      <span className="brand-mark-sigil" aria-hidden="true">
        梦
      </span>
      <span className="brand-mark-copy">
        <span className="brand-mark-name">DreamLab</span>
        {!compact && <span className="brand-mark-subtitle">心理研究院</span>}
      </span>
    </Link>
  );
}
