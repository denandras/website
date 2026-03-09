type BrandMarkProps = {
  className?: string;
};

export default function BrandMark({ className = "" }: BrandMarkProps) {
  return (
    <span
      aria-hidden="true"
      className={`inline-flex size-6 items-center justify-center rounded-md border border-primary/40 bg-primary/10 font-display text-[11px] leading-none font-bold tracking-wide text-primary ${className}`.trim()}
    >
      DA
    </span>
  );
}
