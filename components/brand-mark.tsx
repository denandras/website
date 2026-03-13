import Image from "next/image";

type BrandMarkProps = {
  className?: string;
};

export default function BrandMark({ className = "" }: BrandMarkProps) {
  return (
    <Image
      src="/logo_tight.svg"
      alt=""
      aria-hidden="true"
      width={24}
      height={24}
      className={`size-6 object-contain ${className}`.trim()}
    />
  );
}
