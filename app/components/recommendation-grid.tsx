"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { Artwork } from "../lib/artmatch-data";

type RecommendationGridProps = {
  artworks: Artwork[];
  selectedId: string;
  onSelect: (artwork: Artwork) => void;
};

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

export function RecommendationGrid({
  artworks,
  selectedId,
  onSelect,
}: RecommendationGridProps) {
  return (
    <section className="space-y-4">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-black/55">
            Matches
          </p>
          <h3 className="text-2xl font-semibold tracking-tight text-black">
            Buy art with confidence.
          </h3>
        </div>
        <p className="text-sm text-black/60">Transparent shortlist of whole artworks</p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {artworks.map((artwork, index) => {
          const active = selectedId === artwork.id;
          return (
            <motion.button
              key={artwork.id}
              type="button"
              onClick={() => onSelect(artwork)}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: 0.06 * index }}
              className={`group space-y-4 rounded-2xl border p-3 text-left transition ${
                active
                  ? "border-black bg-black text-white"
                  : "border-black/10 bg-white hover:border-black/30"
              }`}
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-xl">
                <Image
                  src={artwork.image}
                  alt={`${artwork.title} by ${artwork.artist}`}
                  fill
                  className={`object-cover transition duration-500 ${
                    active ? "scale-[1.02]" : "group-hover:scale-[1.03]"
                  }`}
                />
              </div>
              <div className="space-y-1">
                <p className="text-base font-medium">{artwork.title}</p>
                <p className={`text-sm ${active ? "text-white/75" : "text-black/65"}`}>
                  {artwork.artist} · {artwork.year}
                </p>
                <p className={`text-xs leading-5 ${active ? "text-white/70" : "text-black/60"}`}>
                  {artwork.conciseReason}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className={`rounded-lg p-2 ${active ? "bg-white/10" : "bg-stone-100"}`}>
                  <p className={active ? "text-white/70" : "text-black/55"}>Match</p>
                  <p className="font-semibold">{artwork.matchScore}%</p>
                </div>
                <div className={`rounded-lg p-2 ${active ? "bg-white/10" : "bg-stone-100"}`}>
                  <p className={active ? "text-white/70" : "text-black/55"}>Ask</p>
                  <p className="font-semibold">{formatCurrency(artwork.askPrice)}</p>
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>
    </section>
  );
}
