"use client";

import { useMemo, useState } from "react";
import { ArtworkDetailPanel } from "./components/artwork-detail-panel";
import { HeroSection } from "./components/hero-section";
import { MarketMetrics } from "./components/market-metrics";
import { OnboardingPanel } from "./components/onboarding-panel";
import { RecommendationGrid } from "./components/recommendation-grid";
import { RoomPreview } from "./components/room-preview";
import {
  artworks,
  defaultTasteProfile,
  marketMetrics,
  type TasteProfile,
} from "./lib/artmatch-data";

export default function Home() {
  const [profile, setProfile] = useState<TasteProfile>(defaultTasteProfile);
  const [activeArtworkId, setActiveArtworkId] = useState(artworks[0].id);
  const [openArtworkId, setOpenArtworkId] = useState<string | null>(null);
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [conciergeRequested, setConciergeRequested] = useState(false);

  const activeArtwork = useMemo(
    () => artworks.find((artwork) => artwork.id === activeArtworkId) ?? artworks[0],
    [activeArtworkId],
  );

  const openArtwork = useMemo(
    () => artworks.find((artwork) => artwork.id === openArtworkId) ?? null,
    [openArtworkId],
  );

  const handleSelectArtwork = (artworkId: string) => {
    setActiveArtworkId(artworkId);
    setOpenArtworkId(artworkId);
  };

  const handleSaveArtwork = () => {
    if (!openArtwork) {
      return;
    }
    setSavedIds((current) =>
      current.includes(openArtwork.id) ? current : [...current, openArtwork.id],
    );
  };

  return (
    <div className="min-h-screen bg-[#f5f4f1] text-black">
      <main className="mx-auto w-full max-w-6xl space-y-6 px-4 py-8 sm:px-8 sm:py-10 lg:space-y-8 lg:py-14">
        <HeroSection conciergeRequested={conciergeRequested} />
        <OnboardingPanel
          profile={profile}
          onBudgetChange={(budgetBand) => setProfile((prev) => ({ ...prev, budgetBand }))}
        />
        <RecommendationGrid
          artworks={artworks}
          selectedId={activeArtworkId}
          onSelect={(artwork) => handleSelectArtwork(artwork.id)}
        />
        <RoomPreview artwork={activeArtwork} profile={profile} />
        <MarketMetrics metrics={marketMetrics} />
        <section className="rounded-3xl border border-black/10 bg-black px-6 py-7 text-white sm:px-8">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/70">
            Checkout / Concierge
          </p>
          <div className="mt-3 flex flex-wrap items-center justify-between gap-4">
            <h4 className="text-2xl font-semibold tracking-tight">Concierge-backed execution.</h4>
            <button
              type="button"
              onClick={() => {
                setConciergeRequested(true);
                setOpenArtworkId(activeArtwork.id);
              }}
              className="rounded-full bg-white px-5 py-2.5 text-sm font-medium text-black transition hover:bg-white/90"
            >
              Start purchase flow
            </button>
          </div>
        </section>
      </main>
      <ArtworkDetailPanel
        artwork={openArtwork}
        isSaved={openArtwork ? savedIds.includes(openArtwork.id) : false}
        onClose={() => setOpenArtworkId(null)}
        onSave={handleSaveArtwork}
        onRequestConcierge={() => setConciergeRequested(true)}
      />
    </div>
  );
}
