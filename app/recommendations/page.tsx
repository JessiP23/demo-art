"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { PageShell } from "@/components/page-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { buildCuratedRecommendations } from "@/lib/engines";
import { useArtworks } from "@/lib/queries";
import type { Artwork } from "@/lib/types";
import { currency } from "@/lib/utils";
import { useAppStore } from "@/stores/app-store";

export default function RecommendationsPage() {
  const { userTaste, selectedArtworks, toggleSelectedArtwork } = useAppStore();
  const artworksQuery = useArtworks();

  const curated = buildCuratedRecommendations({
    tasteTags: userTaste,
    artworks: artworksQuery.data ?? [],
    limit: 5,
  });

  return (
    <PageShell
      title="Curated decision set"
      subtitle="Finite recommendations selected from your Taste Graph. Every result is ranked for confidence, not browsing volume."
    >
      {userTaste.length === 0 ? (
        <Card>
          <CardContent className="flex flex-wrap items-center justify-between gap-3 p-5">
            <p className="text-sm text-black/70">Start a Taste Profile first to generate your decision set.</p>
            <Link href="/onboard">
              <Button>Start Taste Profile</Button>
            </Link>
          </CardContent>
        </Card>
      ) : null}
      {artworksQuery.isLoading ? (
        <div className="grid gap-4 lg:grid-cols-2">
          {Array.from({ length: 4 }).map((_, idx) => (
            <Skeleton key={idx} className="h-96" />
          ))}
        </div>
      ) : null}
      {userTaste.length > 0 ? (
        <div className="grid gap-5 lg:grid-cols-2">
          {curated.map(({ artwork, matchScore }, idx) => (
            <motion.div
              key={artwork.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: idx * 0.06 }}
            >
              <RecommendationCard
                artwork={artwork}
                match={matchScore}
                selected={selectedArtworks.includes(artwork.id)}
                onToggleSelect={() => toggleSelectedArtwork(artwork.id)}
              />
            </motion.div>
          ))}
        </div>
      ) : null}
      {userTaste.length > 0 && curated.length === 0 ? (
        <p className="text-sm text-black/60">No matches yet. Add more style signals in Taste Profile.</p>
      ) : null}
      {userTaste.length > 0 ? (
        <div className="rounded-[1.5rem] border border-black/10 bg-white p-5">
          <p className="text-xs uppercase tracking-[0.15em] text-black/55">Decision insight</p>
          <p className="mt-2 text-sm text-black/72">
            Selected for comparison: {selectedArtworks.length}. Click compare on any artwork detail panel to build a shortlist.
          </p>
        </div>
      ) : null}
    </PageShell>
  );
}

function RecommendationCard({
  artwork,
  match,
  selected,
  onToggleSelect,
}: {
  artwork: Artwork;
  match: number;
  selected: boolean;
  onToggleSelect: () => void;
}) {
  return (
    <Card>
      <CardContent className="space-y-4 p-4">
        <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
          <Image src={artwork.image_url} alt={artwork.title} fill className="object-cover" />
        </div>
        <div className="space-y-1">
          <p className="text-xs uppercase tracking-[0.14em] text-black/55">{artwork.artist}</p>
          <h3 className="text-2xl font-semibold tracking-tight">{artwork.title}</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge className="normal-case tracking-normal">{match}% Match</Badge>
          <Badge className="normal-case tracking-normal">{currency(artwork.price_eur)}</Badge>
        </div>
        <p className="text-sm leading-6 text-black/72">{artwork.match_explanation}</p>
        <div className="flex flex-wrap gap-2">
          <Link href={`/artwork/${artwork.id}`}>
            <Button size="sm">Open decision panel</Button>
          </Link>
          <Button size="sm" variant="secondary" onClick={onToggleSelect}>
            {selected ? "Remove Compare" : "Compare"}
          </Button>
          <Button size="sm" variant="secondary">
            Request validation
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
