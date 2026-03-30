"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  const productPoints = [
    "Taste onboarding across 12 dimensions",
    "Explainable recommendation rationale",
    "Fair-value pricing confidence bands",
    "Room preview before purchase",
    "Concierge-backed acquisition workflow",
    "Secure checkout and pro membership",
  ];

  const workflow = [
    {
      step: "01",
      title: "Calibrate your taste",
      description:
        "Onboard with quick swipe interactions so ArtMatch learns your style preferences and confidence level.",
    },
    {
      step: "02",
      title: "Review transparent matches",
      description:
        "Get ranked artworks with clear rationale, fair-value bands, and artist momentum context before you decide.",
    },
    {
      step: "03",
      title: "Buy with concierge support",
      description:
        "Request white-glove support for offer strategy, logistics, and closeout while keeping pricing and fees visible.",
    },
  ];

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
          <p className="max-w-xl text-base leading-7 text-black/70 sm:text-lg">
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

      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {productPoints.map((point) => (
          <Card key={point}>
            <CardContent className="p-5">
              <p className="text-sm font-medium text-black/85">{point}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="rounded-[2rem] border border-black/10 bg-white p-6 shadow-[0_20px_50px_-32px_rgba(0,0,0,0.35)] lg:p-8">
        <div className="max-w-3xl">
          <p className="text-xs uppercase tracking-[0.16em] text-black/60">How ArtMatch works</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight">A complete product for first-time collectors</h2>
          <p className="mt-3 text-sm leading-6 text-black/70">
            ArtMatch is built around one goal: helping you discover, validate, and acquire artwork
            without guesswork. Every part of the journey is integrated into one experience.
          </p>
        </div>
        <div className="mt-6 grid gap-3 lg:grid-cols-3">
          {workflow.map((item) => (
            <Card key={item.step} className="shadow-none">
              <CardContent className="p-5">
                <p className="text-xs uppercase tracking-[0.16em] text-black/55">{item.step}</p>
                <h3 className="mt-2 text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-black/70">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="grid gap-4 rounded-[2rem] border border-black/10 bg-black p-6 text-white lg:grid-cols-[1fr_auto] lg:items-end lg:p-8">
        <div>
          <p className="text-xs uppercase tracking-[0.16em] text-white/75">Start collecting</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight">From first match to final acquisition</h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-white/75">
            Create your account, complete onboarding, and explore live recommendations tailored to your space, taste, and budget.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link href="/auth">
            <Button>Get Started</Button>
          </Link>
          <Link href="/recommendations">
            <Button variant="secondary" className="border-white/30 bg-transparent text-white hover:border-white/70">
              Explore Product
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
}
