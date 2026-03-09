import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background-dark px-6 text-center text-neutral-100">
      <p className="font-display text-xs font-semibold tracking-[0.24em] text-primary uppercase">404</p>
      <h1 className="mt-3 font-display text-4xl font-bold tracking-tight md:text-5xl">Page not found</h1>
      <p className="mt-4 max-w-md text-sm text-neutral-300 md:text-base">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center justify-center rounded-xl border border-primary/20 bg-primary/5 px-5 py-3 font-display font-semibold text-neutral-100 transition-colors hover:bg-primary/10"
      >
        Back to home
      </Link>
    </main>
  );
}
