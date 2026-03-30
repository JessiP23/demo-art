"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-6xl space-y-8 px-4 py-8 sm:px-8 lg:py-14">
      <section className="grid gap-6 rounded-[2rem] border border-black/10 bg-white p-4 shadow-[0_24px_60px_-30px_rgba(0,0,0,0.35)] lg:grid-cols-[1.12fr_0.88fr] lg:p-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-6 p-2"
        >
          <Badge>Whole-asset brokerage</Badge>
          <h1 className="text-4xl font-semibold leading-[1.03] tracking-tight sm:text-6xl">
            Buy art with confidence.
          </h1>
          <p className="max-w-xl text-base leading-7 text-black/70 dark:text-white/70 sm:text-lg">
            ArtMatch combines explainable taste matching, fair-value pricing, room intelligence,
            and concierge-backed execution for affluent first-time collectors.
          </p>
          <div className="flex flex-wrap gap-2 text-sm">
            <Badge className="normal-case tracking-normal">Explainable taste matching</Badge>
            <Badge className="normal-case tracking-normal">Fair-value pricing</Badge>
            <Badge className="normal-case tracking-normal">Concierge-backed execution</Badge>
          </div>
          <div className="flex flex-wrap gap-3 pt-2">
            <Link href="/auth">
              <Button>Get Started</Button>
            </Link>
            <Link href="/recommendations">
              <Button variant="secondary">View Product</Button>
            </Link>
          </div>
        </motion.div>
        <div className="grid min-h-[390px] grid-cols-6 grid-rows-6 gap-2 overflow-hidden rounded-[1.4rem] bg-stone-100">
          <div className="relative col-span-6 row-span-4">
            <Image src="/contour-ocre.png" alt="Featured artwork" fill priority className="object-cover" />
          </div>
          <div className="relative col-span-3 row-span-2">
            <Image src="/dusk.png" alt="Texture artwork" fill className="object-cover" />
          </div>
          <div className="relative col-span-3 row-span-2">
            <Image src="/quiet-frequency.png" alt="Color artwork" fill className="object-cover" />
          </div>
        </div>
      </section>
    </main>
  );
}
