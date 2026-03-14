"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { IconDownload } from "@/components/icons";

type MediaItem = {
  id: string;
  viewUrl: string;
  downloadUrl: string;
};

export default function MediaGallery({ items }: { items: MediaItem[] }) {
  const [loadedIds, setLoadedIds] = useState<Record<string, true>>({});
  const [failedIds, setFailedIds] = useState<Record<string, true>>({});
  const galleryRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = galleryRef.current;
    if (!root) return;

    const nodes = Array.from(root.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (!nodes.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -6% 0px" },
    );

    const raf = window.requestAnimationFrame(() => {
      nodes.forEach((node) => {
        if (!node.classList.contains("is-visible")) {
          observer.observe(node);
        }
      });
    });

    return () => {
      window.cancelAnimationFrame(raf);
      observer.disconnect();
    };
  }, [items.length]);

  return (
    <div ref={galleryRef} className="relative z-10 mt-20 columns-1 gap-4 md:mt-24 sm:columns-2 lg:columns-3">
      {items.map((item, index) => {
        const isLoaded = !!loadedIds[item.id];
        const hasFailed = !!failedIds[item.id];
        const downloadVisibilityClass = isLoaded
          ? "opacity-100 pointer-events-auto md:opacity-0 md:pointer-events-none md:group-hover:pointer-events-auto md:group-hover:opacity-100"
          : "opacity-0 pointer-events-none";
        const prioritized = index < 6;

        return (
          <div
            key={item.id}
            className="mb-4 break-inside-avoid"
            data-reveal
            style={{ "--reveal-delay": `${80 + (index % 12) * 55}ms` }}
          >
            <article
              className={`interactive-surface group relative overflow-hidden rounded-xl transition-all ${
                isLoaded
                  ? "border border-neutral-border bg-neutral-dark/40 hover:border-primary/30 hover:bg-neutral-dark"
                  : "border border-transparent bg-transparent"
              }`}
              data-proximity
              data-proximity-strength="2.1"
            >
              {!isLoaded ? <div className="absolute inset-0 animate-pulse bg-neutral-dark/70" /> : null}
              <Image
                src={item.viewUrl}
                alt={`Gallery image ${index + 1}`}
                width={1600}
                height={1200}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                loading={prioritized ? "eager" : "lazy"}
                fetchPriority={prioritized ? "high" : "auto"}
                onLoad={() => {
                  setLoadedIds((prev) => (prev[item.id] ? prev : { ...prev, [item.id]: true }));
                }}
                onError={() => {
                  setFailedIds((prev) => (prev[item.id] ? prev : { ...prev, [item.id]: true }));
                  setLoadedIds((prev) => (prev[item.id] ? prev : { ...prev, [item.id]: true }));
                }}
                className={`block h-auto w-full object-cover transition-opacity duration-300 ${isLoaded ? "opacity-100" : "opacity-0"}`}
              />

              {hasFailed ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-neutral-dark/85 p-4 text-center">
                  <p className="text-sm text-neutral-100">Images failed to load.</p>
                  <a
                    href="https://denandras.ddns.net/index.php/s/press"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-lg border border-primary/40 bg-primary/10 px-4 py-2 text-sm font-semibold text-neutral-100 transition-colors hover:bg-primary/20"
                  >
                    Open Press Gallery
                  </a>
                </div>
              ) : null}

              {!hasFailed ? (
                <a
                  href={item.downloadUrl}
                  className={`absolute top-3 right-3 inline-flex items-center justify-center rounded-lg border border-primary/30 bg-background-dark/70 p-2.5 text-neutral-100 backdrop-blur-sm transition-all duration-200 hover:bg-background-dark/85 ${downloadVisibilityClass}`}
                  aria-label="Download image"
                  title="Download"
                >
                  <IconDownload className="size-4 text-primary" />
                </a>
              ) : null}
            </article>
          </div>
        );
      })}
    </div>
  );
}
