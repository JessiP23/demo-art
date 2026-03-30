"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import type { Artwork } from "../lib/artmatch-data";

type ArtworkDetailPanelProps = {
  artwork: Artwork | null;
  isSaved: boolean;
  onClose: () => void;
  onSave: () => void;
  onRequestConcierge: () => void;
  onCheckout: () => void;
};

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

export function ArtworkDetailPanel({
  artwork,
  isSaved,
  onClose,
  onSave,
  onRequestConcierge,
  onCheckout,
}: ArtworkDetailPanelProps) {
  return (
    <AnimatePresence>
      {artwork ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-2 sm:items-center sm:p-8"
        >
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="w-full max-w-5xl overflow-hidden rounded-3xl border border-black/10 bg-white shadow-2xl"
          >
            <div className="grid md:grid-cols-[1.05fr_1.35fr]">
              <div className="relative min-h-[340px]">
                <Image
                  src={artwork.image}
                  alt={`${artwork.title} by ${artwork.artist}`}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="space-y-4 p-6 sm:p-8">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-[0.18em] text-black/55">
                      Whole-asset brokerage
                    </p>
                    <h4 className="text-2xl font-semibold tracking-tight text-black">
                      {artwork.title}
                    </h4>
                    <p className="text-sm text-black/65">
                      {artwork.artist} · {artwork.year} · {artwork.medium}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={onClose}
                    className="rounded-full border border-black/10 px-3 py-1 text-sm text-black/60 hover:border-black/30"
                  >
                    Close
                  </button>
                </div>
                <div className="grid gap-3 rounded-2xl border border-black/10 bg-stone-50 p-4 text-sm sm:grid-cols-3">
                  <div>
                    <p className="text-black/55">Ask price</p>
                    <p className="font-semibold text-black">{formatCurrency(artwork.askPrice)}</p>
                  </div>
                  <div>
                    <p className="text-black/55">Fair-value band</p>
                    <p className="font-semibold text-black">
                      {formatCurrency(artwork.fairValueLow)}–{formatCurrency(artwork.fairValueHigh)}
                    </p>
                  </div>
                  <div>
                    <p className="text-black/55">Fair-value score</p>
                    <p className="font-semibold text-black">{artwork.fairValueScore}/100</p>
                  </div>
                </div>
                <div className="grid gap-4 text-sm text-black/78 sm:grid-cols-2">
                  <div className="space-y-2">
                    <p className="font-medium text-black">Why it matches your taste</p>
                    {artwork.whyItMatches.map((point) => (
                      <p key={point}>{point}</p>
                    ))}
                  </div>
                  <div className="space-y-2">
                    <p className="font-medium text-black">Fair-value rationale</p>
                    {artwork.fairValueRationale.map((point) => (
                      <p key={point}>{point}</p>
                    ))}
                  </div>
                </div>
                <div className="rounded-2xl border border-black/10 bg-stone-50 p-4 text-sm">
                  <p className="font-medium text-black">Artist momentum</p>
                  <p className="mt-1 text-black/70">{artwork.artistMomentum}</p>
                </div>
                <div className="rounded-2xl border border-black/10 p-4 text-sm">
                  <p className="font-medium text-black">Room fit preview</p>
                  <p className="mt-1 text-black/70">{artwork.roomFit}</p>
                  <p className="mt-2 text-black/55">{artwork.dimensions}</p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={onRequestConcierge}
                    className="rounded-full bg-black px-5 py-2.5 text-sm font-medium text-white transition hover:bg-black/85"
                  >
                    Request concierge
                  </button>
                  <button
                    type="button"
                    onClick={onSave}
                    className="rounded-full border border-black/15 px-5 py-2.5 text-sm font-medium text-black transition hover:border-black/40"
                  >
                    {isSaved ? "Saved to collection" : "Save to collection"}
                  </button>
                  <button
                    type="button"
                    onClick={onCheckout}
                    className="rounded-full border border-black/15 px-5 py-2.5 text-sm font-medium text-black transition hover:border-black/40"
                  >
                    Proceed to checkout
                  </button>
                  <button
                    type="button"
                    onClick={onCheckout}
                    className="rounded-full border border-black/15 px-5 py-2.5 text-sm font-medium text-black transition hover:border-black/40"
                  >
                    Request specialist intro
                  </button>
                </div>
                <p className="text-xs uppercase tracking-[0.15em] text-black/45">
                  Concierge-backed execution.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
