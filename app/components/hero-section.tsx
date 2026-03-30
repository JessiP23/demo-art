"use client";

import { motion } from "framer-motion";

type HeroSectionProps = {
  conciergeRequested: boolean;
};

export function HeroSection({ conciergeRequested }: HeroSectionProps) {
  return (
    <section className="space-y-8">
      <div className="inline-flex items-center rounded-full border border-black/10 bg-white px-4 py-1.5 text-xs font-medium uppercase tracking-[0.17em] text-black/65">
        AI-powered brokerage for first-time collectors
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="space-y-6"
      >
        <h1 className="max-w-4xl text-4xl font-semibold leading-[1.06] tracking-tight text-black sm:text-6xl">
          Buy art with confidence.
        </h1>
        <p className="max-w-2xl text-base leading-7 text-black/70 sm:text-lg">
          ArtMatch is the confidence layer for buying art online: explainable taste
          matching, fair-value pricing, and concierge-backed execution for whole physical
          artworks.
        </p>
        <div className="flex flex-wrap gap-3 text-sm">
          <span className="rounded-full border border-black/15 px-4 py-2 text-black">
            Explainable taste matching.
          </span>
          <span className="rounded-full border border-black/15 px-4 py-2 text-black">
            Fair-value pricing.
          </span>
          <span className="rounded-full border border-black/15 px-4 py-2 text-black">
            Whole-asset brokerage.
          </span>
        </div>
      </motion.div>
      {conciergeRequested ? (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-xl rounded-2xl border border-black/10 bg-black px-5 py-4 text-sm text-white"
        >
          Concierge request received. ArtMatch will send a pricing memo and execution path
          within one business day.
        </motion.div>
      ) : null}
    </section>
  );
}
