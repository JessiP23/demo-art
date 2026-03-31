"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  const highlights = [
    "Taste Graph calibration",
    "Finite high-confidence picks",
    "Fair Value decision band",
    "Career momentum intelligence",
  ];

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-8 lg:py-16">
      <section className="rounded-[2rem] border border-black/10 bg-white px-6 py-10 text-center shadow-[0_25px_60px_-35px_rgba(0,0,0,0.35)] sm:px-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl space-y-6"
        >
          <p className="text-xs uppercase tracking-[0.2em] text-black/55">Decision Intelligence for Art</p>
          <h1 className="text-4xl font-semibold leading-[1.04] tracking-tight sm:text-6xl">
            Find art you can confidently buy
          </h1>
          <p className="text-base leading-7 text-black/72 sm:text-lg">
            Turn your taste into a data-backed decision in under 60 seconds
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {highlights.map((item) => (
              <span
                key={item}
                className="rounded-full border border-black/15 px-4 py-1.5 text-xs uppercase tracking-[0.12em] text-black/70"
              >
                {item}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link href="/onboard">
              <Button size="lg">Start Taste Profile</Button>
            </Link>
            <Link href="/audit">
              <Button variant="secondary" size="lg">
                Upload an artwork for valuation
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>
      <section className="mt-6 grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-6">
            <p className="text-xs uppercase tracking-[0.14em] text-black/55">01 Input</p>
            <p className="mt-2 text-lg font-semibold">Capture taste signal</p>
            <p className="mt-2 text-sm leading-6 text-black/68">
              Build your taste graph from curated style cards.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-xs uppercase tracking-[0.14em] text-black/55">02 Curate</p>
            <p className="mt-2 text-lg font-semibold">Get finite recommendations</p>
            <p className="mt-2 text-sm leading-6 text-black/68">
              Receive 3–6 artworks chosen for confidence, not endless browsing.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-xs uppercase tracking-[0.14em] text-black/55">03 Decide</p>
            <p className="mt-2 text-lg font-semibold">Validate and commit</p>
            <p className="mt-2 font-mono text-sm leading-6 text-black/68">
              Evaluate match score, fair value, and career momentum in one panel.
            </p>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
