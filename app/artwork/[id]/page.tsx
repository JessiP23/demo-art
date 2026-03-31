"use client";

import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { PageShell } from "@/components/page-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  artistMomentumLabel,
  buildMomentumSeries,
  fairValueBand,
  fairValueStatus,
  valuationConfidence,
} from "@/lib/engines";
import { useArtwork } from "@/lib/queries";
import { currency } from "@/lib/utils";
import { useAppStore } from "@/stores/app-store";

export default function ArtworkDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const artworkQuery = useArtwork(params.id);
  const { selectedArtworks, toggleSelectedArtwork, markViewedArtwork } = useAppStore();

  const artwork = artworkQuery.data;
  const fairValue = artwork ? fairValueBand(artwork) : null;
  const momentumSeries = artwork ? buildMomentumSeries(artwork.momentum_score) : [];
  const isSelected = artwork ? selectedArtworks.includes(artwork.id) : false;

  useEffect(() => {
    if (!artwork) return;
    markViewedArtwork(artwork.id);
  }, [artwork, markViewedArtwork]);

  return (
    <PageShell title="Decision Panel" subtitle="Everything needed to decide: match quality, fair value, and momentum in one screen.">
      {!artwork ? null : (
        <div className="grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
          <Card>
            <CardContent className="p-4">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
                <Image src={artwork.image_url} alt={artwork.title} fill className="object-cover" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="space-y-5">
              <div>
                <p className="text-xs uppercase tracking-[0.16em] text-black/55">{artwork.artist}</p>
                <h2 className="mt-2 text-3xl font-semibold tracking-tight">{artwork.title}</h2>
                <p className="mt-2 text-sm text-black/65">
                  {artwork.medium} · {artwork.dimensions} · {artwork.year}
                </p>
              </div>
              <div className="rounded-2xl border border-black/10 p-4">
                <p className="text-sm font-medium">Match Score</p>
                <p className="mt-2 text-4xl font-semibold tracking-tight">{artwork.fair_value_score}% Match</p>
                <ul className="mt-3 space-y-2 text-sm text-black/70">
                  <li>Similar composition to selected taste cards</li>
                  <li>Aligned with color palette preferences</li>
                </ul>
              </div>
              <div className="rounded-2xl border border-black/10 p-4">
                <p className="text-sm font-medium">Fair Value Engine</p>
                <div className="mt-2 flex items-center justify-between gap-4">
                  <p className="font-mono text-sm">Price: {currency(artwork.price_eur)}</p>
                  <Badge className="normal-case tracking-normal">{fairValueStatus(artwork)}</Badge>
                </div>
                <p className="mt-2 font-mono text-sm text-black/72">
                  Fair Value Range: {currency(fairValue?.low ?? 0)} – {currency(fairValue?.high ?? 0)}
                </p>
                <div className="mt-4">
                  <div className="relative h-2 rounded-full bg-black/10">
                    <div className="absolute left-1/3 top-0 h-2 w-1/3 rounded-full bg-black/25" />
                    <div
                      className="absolute top-[-5px] h-4 w-4 -translate-x-1/2 rounded-full border-2 border-white bg-black"
                      style={{
                        left: `${Math.min(95, Math.max(5, ((artwork.price_eur - (fairValue?.low ?? 1)) / ((fairValue?.high ?? 1) - (fairValue?.low ?? 1))) * 100))}%`,
                      }}
                    />
                  </div>
                  <div className="mt-2 flex justify-between text-[10px] uppercase tracking-[0.14em] text-black/50">
                    <span>Undervalued</span>
                    <span>Fair</span>
                    <span>Overpriced</span>
                  </div>
                </div>
              </div>
              <div className="rounded-2xl border border-black/10 p-4">
                <p className="text-sm font-medium">Career Momentum</p>
                <div className="mt-2 flex items-end justify-between">
                  <p className="text-2xl font-semibold">{artwork.momentum_score}/100</p>
                  <p className="text-sm text-black/70">↑ rising</p>
                </div>
                <div className="mt-3 flex h-12 items-end gap-1">
                  {momentumSeries.map((value, idx) => (
                    <div key={`${value}-${idx}`} className="w-full rounded-t bg-black/70" style={{ height: `${value}%` }} />
                  ))}
                </div>
                <p className="mt-2 text-xs text-black/60">{artistMomentumLabel(artwork.momentum_score)}</p>
              </div>
              <div className="rounded-2xl border border-black/10 p-4">
                <p className="text-sm font-medium">Key Insights</p>
                <ul className="mt-2 space-y-2 text-sm text-black/72">
                  <li>Artist exhibited in 3 galleries in past 12 months</li>
                  <li>Auction prices trending +18% YoY in comparable segment</li>
                  <li>{artwork.auction_comp}</li>
                </ul>
                <p className="mt-3 font-mono text-xs text-black/60">
                  Valuation confidence: {valuationConfidence(artwork.fair_value_score)}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button variant="secondary">Save</Button>
                <Button variant="secondary" onClick={() => toggleSelectedArtwork(artwork.id)}>
                  {isSelected ? "Remove Compare" : "Compare"}
                </Button>
                <Button onClick={() => router.push("/audit")}>Request validation</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </PageShell>
  );
}
