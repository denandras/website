type BrandMarkProps = {
  className?: string;
};

export default function BrandMark({ className = "" }: BrandMarkProps) {
  return (
    <img
      src="/logo_tight.svg"
      alt=""
      aria-hidden="true"
      className={`size-6 object-contain ${className}`.trim()}
    />
  );
}
