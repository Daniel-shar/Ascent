export function AscentMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <path d="M16 90 L50 26" stroke="currentColor" strokeWidth="13" fill="none" />
      <path d="M44 44 L84 90" stroke="currentColor" strokeWidth="13" fill="none" />
      <path d="M44 44 L52 28 L44 28 Z" fill="currentColor" />
    </svg>
  );
}

export function AscentInline({ className = "" }: { className?: string }) {
  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`} role="img" aria-label="Ascent">
      <AscentMark className="h-7 w-7" />
      <span className="text-xl font-semibold leading-none" style={{ letterSpacing: "-0.02em" }}>
        Ascent
      </span>
    </div>
  );
}

export function AscentLockup({
  markSize = 96,
  onDark = false,
}: {
  markSize?: number;
  onDark?: boolean;
}) {
  return (
    <div
      className={`inline-flex flex-col items-center ${onDark ? "text-cream" : "text-charcoal"}`}
      role="img"
      aria-label="Ascent. Build. Launch. Grow."
    >
      <AscentMark
        className="block"
        {...{ style: { width: markSize, height: markSize, marginBottom: markSize * 0.22 } }}
      />
      <span
        className="font-semibold leading-none"
        style={{
          fontSize: markSize * 0.51,
          letterSpacing: "-0.02em",
          marginBottom: markSize * 0.04,
        }}
      >
        Ascent
      </span>
      <span
        className={`font-mono uppercase ${onDark ? "text-warm" : "text-bark"}`}
        style={{
          fontSize: markSize * 0.09,
          letterSpacing: "0.24em",
          opacity: 0.72,
        }}
      >
        Build · Launch · Grow
      </span>
    </div>
  );
}
