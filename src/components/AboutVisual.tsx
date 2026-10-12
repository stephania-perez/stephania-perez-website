type AboutVisualProps = {
  label: string;
};

/** Abstract Mediterranean composition until a studio portrait is available. */
export function AboutVisual({ label }: AboutVisualProps) {
  return (
    <div
      className="relative mx-auto aspect-[3/4] w-full max-w-md md:max-w-none"
      role="img"
      aria-label={label}
    >
      <svg
        viewBox="0 0 480 640"
        className="h-full w-full"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <defs>
          <linearGradient id="about-sky" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#faf7f2" />
            <stop offset="45%" stopColor="#ebe4da" />
            <stop offset="100%" stopColor="#d9cfc3" />
          </linearGradient>
          <radialGradient id="about-sun" cx="78%" cy="22%" r="42%">
            <stop offset="0%" stopColor="#e8c9a0" stopOpacity="0.55" />
            <stop offset="55%" stopColor="#e8c9a0" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#e8c9a0" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="about-floor" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#2c3440" stopOpacity="0" />
            <stop offset="100%" stopColor="#2c3440" stopOpacity="0.14" />
          </linearGradient>
          <linearGradient id="about-arch-fill" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.08" />
          </linearGradient>
          <filter id="about-grain" x="0%" y="0%" width="100%" height="100%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.85"
              numOctaves="4"
              stitchTiles="stitch"
              result="noise"
            />
            <feColorMatrix type="saturate" values="0" in="noise" result="mono" />
            <feBlend in="SourceGraphic" in2="mono" mode="soft-light" />
          </filter>
        </defs>

        <rect width="480" height="640" fill="url(#about-sky)" filter="url(#about-grain)" />
        <rect width="480" height="640" fill="url(#about-sun)" />
        <rect width="480" height="640" fill="url(#about-floor)" />

        {/* distant soft horizon */}
        <ellipse cx="340" cy="200" rx="180" ry="70" fill="#f5efe6" opacity="0.7" />

        {/* main arch */}
        <path
          d="M 72 520 L 72 280 Q 72 120 200 120 Q 328 120 328 280 L 328 520 Z"
          fill="url(#about-arch-fill)"
          stroke="#ffffff"
          strokeOpacity="0.65"
          strokeWidth="1.25"
        />
        {/* inner arch shadow */}
        <path
          d="M 98 520 L 98 295 Q 98 155 200 155 Q 302 155 302 295 L 302 520 Z"
          fill="#2c3440"
          opacity="0.04"
        />

        {/* secondary arch, depth */}
        <path
          d="M 300 540 L 300 360 Q 300 240 380 240 Q 460 240 460 360 L 460 540 Z"
          fill="#ffffff"
          opacity="0.12"
          stroke="#ffffff"
          strokeOpacity="0.35"
          strokeWidth="1"
        />

        {/* light on floor */}
        <ellipse cx="200" cy="560" rx="120" ry="28" fill="#faf7f2" opacity="0.5" />
        <path
          d="M 140 520 L 200 420 L 260 520 Z"
          fill="#f0e6d8"
          opacity="0.35"
        />

        {/* terracotta accent */}
        <rect x="48" y="588" width="384" height="3" fill="#c4a98a" opacity="0.45" />
        <rect x="48" y="595" width="384" height="1" fill="#2c3440" opacity="0.12" />
      </svg>

      <div
        className="pointer-events-none absolute inset-3 border border-white/50 sm:inset-4"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-border/30"
        aria-hidden
      />
    </div>
  );
}
