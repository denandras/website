"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { IconDownload } from "@/components/icons";

type MediaItem = {
  id: string;
  viewUrl: string;
  downloadUrl: string;
};

type ItemWithRatio = MediaItem & {
  ratio: number;
  originalIndex: number;
};

function estimatedVisualHeight(ratio: number) {
  // Estimate relative rendered height in a fixed-width column.
  return 1 / Math.max(ratio, 0.35);
}

function buildAestheticOrder(items: ItemWithRatio[]) {
  const tall = items
    .filter((item) => item.ratio < 0.92)
    .sort((a, b) => a.ratio - b.ratio);
  const wide = items
    .filter((item) => item.ratio > 1.18)
    .sort((a, b) => b.ratio - a.ratio);
  const neutral = items
    .filter((item) => item.ratio >= 0.92 && item.ratio <= 1.18)
    .sort((a, b) => b.ratio - a.ratio);

  const ordered: ItemWithRatio[] = [];
  const pattern: Array<"wide" | "tall" | "neutral"> = ["wide", "tall", "neutral", "tall", "wide", "neutral"];
  let step = 0;

  while (tall.length || wide.length || neutral.length) {
    const desired = pattern[step % pattern.length];
    step += 1;

    let next: ItemWithRatio | undefined;
    if (desired === "wide") next = wide.shift() ?? neutral.shift() ?? tall.shift();
    if (desired === "tall") next = tall.shift() ?? neutral.shift() ?? wide.shift();
    if (desired === "neutral") next = neutral.shift() ?? wide.shift() ?? tall.shift();
    if (!next) break;

    ordered.push(next);
  }

  return ordered;
}

export default function MediaGallery({ items }: { items: MediaItem[] }) {
  const [ratios, setRatios] = useState<Record<string, number>>({});
  const [loadedIds, setLoadedIds] = useState<Record<string, true>>({});
  const galleryRef = useRef<HTMLDivElement | null>(null);
  const ratioProbeStartedRef = useRef<Set<string>>(new Set());

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

  useEffect(() => {
    let cancelled = false;

    items.forEach((item) => {
      if (ratioProbeStartedRef.current.has(item.id)) return;
      ratioProbeStartedRef.current.add(item.id);

      const img = new Image();
      img.decoding = "async";
      img.src = item.viewUrl;
      img.onload = () => {
        if (cancelled || !img.naturalWidth || !img.naturalHeight) return;

        const ratio = img.naturalWidth / img.naturalHeight;
        setRatios((prev) => {
          if (prev[item.id] === ratio) return prev;
          return { ...prev, [item.id]: ratio };
        });
      };
    });

    return () => {
      cancelled = true;
    };
  }, [items]);

  const galleryItems = useMemo(() => {
    const withRatios: ItemWithRatio[] = items.map((item, originalIndex) => ({
      ...item,
      ratio: ratios[item.id] ?? 1,
      originalIndex,
    }));

    const aestheticallyOrdered = buildAestheticOrder(withRatios);

    // Re-balance visual column height for better rhythm in CSS columns flow.
    const columns: ItemWithRatio[][] = [[], [], []];
    const heights = [0, 0, 0];
    aestheticallyOrdered.forEach((item) => {
      const target = heights.indexOf(Math.min(...heights));
      columns[target].push(item);
      heights[target] += estimatedVisualHeight(item.ratio);
    });

    return [...columns[0], ...columns[1], ...columns[2]];
  }, [items, ratios]);

  return (
    <div ref={galleryRef} className="relative z-10 mt-20 columns-1 gap-4 sm:columns-2 md:mt-24 lg:columns-3">
      {galleryItems.map((item, index) => {
        const isLoaded = !!loadedIds[item.id];
        const downloadVisibilityClass = isLoaded
          ? "opacity-100 pointer-events-auto md:opacity-0 md:pointer-events-none md:group-hover:pointer-events-auto md:group-hover:opacity-100"
          : "opacity-0 pointer-events-none";

        return (
          <div
            key={item.id}
            className="mb-4 break-inside-avoid"
            data-reveal
            style={{ ["--reveal-delay" as any]: `${80 + (index % 12) * 55}ms` }}
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
              <img
                src={item.viewUrl}
                alt={`Gallery image ${index + 1}`}
                loading="lazy"
                ref={(node) => {
                  if (!node) return;
                  if (node.complete && node.naturalWidth > 0) {
                    setLoadedIds((prev) => (prev[item.id] ? prev : { ...prev, [item.id]: true }));
                  }
                }}
                onLoad={() => {
                  setLoadedIds((prev) => (prev[item.id] ? prev : { ...prev, [item.id]: true }));
                }}
                onError={() => {
                  setLoadedIds((prev) => (prev[item.id] ? prev : { ...prev, [item.id]: true }));
                }}
                className={`block h-auto w-full object-cover transition-opacity duration-300 ${isLoaded ? "opacity-100" : "opacity-0"}`}
              />

              <a
                href={item.downloadUrl}
                className={`absolute top-3 right-3 inline-flex items-center justify-center rounded-lg border border-primary/30 bg-background-dark/70 p-2.5 text-neutral-100 backdrop-blur-sm transition-all duration-200 hover:bg-background-dark/85 ${downloadVisibilityClass}`}
                aria-label="Download image"
                title="Download"
              >
                <IconDownload className="size-4 text-primary" />
              </a>
            </article>
          </div>
        );
      })}
    </div>
  );
}
