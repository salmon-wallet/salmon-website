/**
 * Line icons for the wallet's powerups, shared across sections.
 * Extracted from components/sections/Powerups.tsx so other surfaces can reuse
 * them; `stake` (and any future key) falls through to the default glyph.
 */

export type PowerupIconType =
  | 'swap'
  | 'bridge'
  | 'portfolio'
  | 'explore'
  | 'onRamp'
  | 'news'
  | 'chat'
  | 'privateSend'
  | 'stake';

interface PowerupIconProps {
  type: PowerupIconType;
  className?: string;
}

export function PowerupIcon({ type, className }: PowerupIconProps) {
  const common = {
    className,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.5,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true as const,
  };

  if (type === 'swap') {
    return (
      <svg {...common}>
        <path d="M7 7h11l-3-3" />
        <path d="m18 7-3 3" />
        <path d="M17 17H6l3 3" />
        <path d="m6 17 3-3" />
      </svg>
    );
  }

  if (type === 'bridge') {
    return (
      <svg {...common}>
        <path d="M4 18V8" />
        <path d="M20 18V8" />
        <path d="M4 12c4-5 12-5 16 0" />
        <path d="M8 18v-3" />
        <path d="M16 18v-3" />
        <path d="M2 18h20" />
      </svg>
    );
  }

  if (type === 'portfolio') {
    return (
      <svg {...common}>
        <path d="M4 19V9" />
        <path d="M10 19V5" />
        <path d="M16 19v-7" />
        <path d="M22 19V3" />
      </svg>
    );
  }

  if (type === 'explore') {
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="9" />
        <path d="m15 9-2 4-4 2 2-4 4-2Z" />
      </svg>
    );
  }

  if (type === 'onRamp') {
    return (
      <svg {...common}>
        <path d="M4 7h13" />
        <path d="m14 4 3 3-3 3" />
        <path d="M20 17H7" />
        <path d="m10 14-3 3 3 3" />
      </svg>
    );
  }

  if (type === 'news') {
    return (
      <svg {...common}>
        <path d="M5 4h12v16H5z" />
        <path d="M9 8h4" />
        <path d="M9 12h4" />
        <path d="M9 16h4" />
        <path d="M17 8h2v10a2 2 0 0 1-2 2" />
      </svg>
    );
  }

  if (type === 'chat') {
    return (
      <svg {...common}>
        <path d="M5 5h14v11H9l-4 4V5Z" />
        <path d="M9 9h6" />
        <path d="M9 12h4" />
      </svg>
    );
  }

  if (type === 'privateSend') {
    return (
      <svg {...common}>
        <path d="m4 12 16-7-7 16-2-7-7-2Z" />
        <path d="m11 14 4-4" />
        <path d="M18 16a4 4 0 0 1-4 4" />
      </svg>
    );
  }

  return (
    <svg {...common}>
      <path d="M12 3v18" />
      <path d="m7 8 5-5 5 5" />
      <path d="M5 15h14" />
      <path d="M7 19h10" />
    </svg>
  );
}
