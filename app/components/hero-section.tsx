"use client";

import { motion } from "framer-motion";
import Image from "next/image";

type HeroSectionProps = {
  conciergeRequested: boolean;
};

export function HeroSection({ conciergeRequested }: HeroSectionProps) {
  return (
    <section className="grid gap-6 rounded-[2rem] border border-black/10 bg-white p-4 shadow-[0_24px_60px_-30px_rgba(0,0,0,0.35)] lg:grid-cols-[1.15fr_0.85fr] lg:p-8">
      <div className="space-y-8 p-3">
        <div className="inline-flex items-center rounded-full border border-black/10 bg-stone-100 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.17em] text-black/65">
          AI-powered brokerage for first-time collectors
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="space-y-6"
        >
          <h1 className="max-w-4xl text-4xl font-semibold leading-[1.03] tracking-tight text-black sm:text-6xl">
            Buy art with confidence.
          </h1>
          <p className="max-w-2xl text-base leading-7 text-black/70 sm:text-lg">
            ArtMatch is the confidence layer for buying art online with explainable taste
            matching, fair-value pricing, and concierge-backed execution of whole physical
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
      </div>
      <div className="relative grid min-h-[380px] grid-cols-6 grid-rows-6 overflow-hidden rounded-[1.5rem] bg-stone-100">
        <div className="relative col-span-6 row-span-4">
          <Image
            src="/contour-ocre.png"
            alt="ArtMatch featured monochrome artwork"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="relative col-span-3 row-span-2">
          <Image
            src="/dusk.png"
            alt="ArtMatch secondary abstract artwork"
            fill
            className="object-cover"
          />
        </div>
        <div className="relative col-span-3 row-span-2">
          <Image
            src="/quiet-frequency.png"
            alt="ArtMatch color field artwork"
            fill
            className="object-cover"
          />
        </div>
      </div>
      {conciergeRequested ? (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-xl rounded-2xl border border-black/10 bg-black px-5 py-4 text-sm text-white lg:col-span-2"
        >
          Concierge request received. ArtMatch will send a pricing memo and execution path
          within one business day.
        </motion.div>
      ) : null}
    </section>
  );
}
