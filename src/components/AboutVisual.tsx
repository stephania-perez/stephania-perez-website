type AboutVisualProps = {
  label: string;
};

/** Abstract placeholder until a studio portrait is available. */
export function AboutVisual({ label }: AboutVisualProps) {
  return (
    <div
      className="relative mx-auto aspect-[3/4] w-full max-w-md overflow-hidden bg-[#ebe6df] md:max-w-none"
      role="img"
      aria-label={label}
    >
      <div
        className="absolute inset-0 bg-gradient-to-br from-[#f7f4ef] via-[#ebe6df] to-[#d8d0c6]"
        aria-hidden
      />
      <div
        className="absolute -left-[15%] top-[8%] h-[42%] w-[75%] rounded-[999px] bg-[#faf8f5]/90 shadow-[inset_0_0_80px_rgba(255,255,255,0.6)]"
        aria-hidden
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-[38%] bg-gradient-to-t from-[#2c3440]/12 to-transparent"
        aria-hidden
      />
      <div
        className="absolute left-[12%] top-[18%] h-[52%] w-[38%] rounded-t-[999px] border border-white/50 bg-white/20 backdrop-blur-[1px]"
        aria-hidden
      />
      <div
        className="absolute right-[8%] top-[28%] h-[34%] w-[48%] rounded-full bg-[#c4a98a]/25 blur-3xl"
        aria-hidden
      />
      <div
        className="absolute bottom-[22%] left-[18%] right-[18%] h-px bg-white/60"
        aria-hidden
      />
      <div
        className="absolute bottom-[18%] left-1/2 h-8 w-px -translate-x-1/2 bg-white/40"
        aria-hidden
      />
      <p
        className="absolute bottom-8 left-0 right-0 text-center font-serif text-[10px] uppercase tracking-[0.35em] text-[#2c3440]/45"
        aria-hidden
      >
        SP
      </p>
    </div>
  );
}
