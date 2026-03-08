import Link from "next/link";
import { IconHome, IconMusicNote, IconSend } from "@/components/icons";

type BottomNavProps = {
  active: "home" | "cv" | "contact";
};

const itemBase =
  "flex h-full items-center justify-center transition-colors";

export default function BottomNav({ active }: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-neutral-border bg-neutral-dark/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md">
      <div className="mx-auto grid h-16 w-full max-w-2xl grid-cols-3">
        <Link
          href="/cv"
          className={`${itemBase} ${
            active === "cv"
              ? "text-primary"
              : "text-neutral-400 hover:text-primary"
          }`}
        >
          <IconMusicNote className="size-5" />
        </Link>

        <Link
          href="/"
          className={`${itemBase} ${
            active === "home" ? "text-primary" : "text-neutral-400 hover:text-primary"
          }`}
        >
          <IconHome className="size-5" />
        </Link>

        <Link
          href="/contact"
          className={`${itemBase} ${
            active === "contact"
              ? "text-primary"
              : "text-neutral-400 hover:text-primary"
          }`}
        >
          <IconSend className="size-5" />
        </Link>
      </div>
    </nav>
  );
}