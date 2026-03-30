"use client";

import Image from "next/image";
import Link from "next/link";
import { AuthGuard } from "@/components/auth-guard";
import { PageShell } from "@/components/page-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useArtworks,
  useCreateConciergeRequest,
  useRecommendations,
  useSaveArtwork,
} from "@/lib/queries";
import type { Artwork } from "@/lib/types";
import { currency } from "@/lib/utils";
import { useAuthStore } from "@/stores/auth-store";

export default function RecommendationsPage() {
  const { user, refresh } = useAuthStore();
  const artworksQuery = useArtworks();
  const recommendationsQuery = useRecommendations(user?.id, user?.taste_profile);
  const saveMutation = useSaveArtwork(user?.id);
  const conciergeMutation = useCreateConciergeRequest(user?.id);

  return (
    <AuthGuard>
      <PageShell
        title="Recommendations"
        subtitle="Explainable taste matching with fair-value context and concierge execution."
      >
        {!user?.taste_profile ? (
          <Card>
            <CardContent className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm text-black/70 dark:text-white/70">
                Complete onboarding to unlock personalized recommendations.
              </p>
              <Link href="/onboard">
                <Button>Complete onboarding</Button>
              </Link>
            </CardContent>
          </Card>
        ) : null}
        {recommendationsQuery.isLoading ? (
          <div className="grid gap-4 md:grid-cols-3">
            {Array.from({ length: 3 }).map((_, idx) => (
              <Skeleton key={idx} className="h-80" />
            ))}
          </div>
        ) : null}
        <div className="grid gap-4 md:grid-cols-3">
          {recommendationsQuery.data?.map((entry) => {
            const artwork = artworksQuery.data?.find((item) => item.id === entry.artwork_id);
            if (!artwork) return null;
            return (
              <RecommendationCard
                key={entry.artwork_id}
                artwork={artwork}
                match={entry.match_score}
                rationale={entry.rationale}
                onSave={async (artworkId) => {
                  await saveMutation.mutateAsync(artworkId);
                  refresh();
                }}
                onConcierge={async (artworkId) => {
                  await conciergeMutation.mutateAsync({
                    artworkId,
                    note: "Interested in acquisition support.",
                  });
                }}
                savedIds={user?.saved_artworks ?? []}
              />
            );
          })}
        </div>
        {recommendationsQuery.data?.length === 0 && user?.taste_profile ? (
          <p className="text-sm text-black/60 dark:text-white/60">No matches yet. Refreshing taste profile helps.</p>
        ) : null}
      </PageShell>
    </AuthGuard>
  );
}

function RecommendationCard({
  artwork,
  match,
  rationale,
  onSave,
  onConcierge,
  savedIds,
}: {
  artwork: Artwork;
  match: number;
  rationale: string;
  onSave: (artworkId: string) => Promise<void>;
  onConcierge: (artworkId: string) => Promise<void>;
  savedIds: string[];
}) {
  return (
    <Card>
      <CardContent className="space-y-3 p-3">
        <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
          <Image src={artwork.image_url} alt={artwork.title} fill className="object-cover" />
        </div>
        <div>
          <h3 className="text-lg font-semibold">{artwork.title}</h3>
          <p className="text-sm text-black/65 dark:text-white/65">{artwork.artist}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge className="normal-case tracking-normal">Match {match}%</Badge>
          <Badge className="normal-case tracking-normal">
            {currency(artwork.price_range[0])}–{currency(artwork.price_range[1])}
          </Badge>
        </div>
        <p className="text-sm text-black/70 dark:text-white/70">{rationale}</p>
        <div className="flex flex-wrap gap-2">
          <Link href={`/artwork/${artwork.id}`}>
            <Button size="sm">Open detail</Button>
          </Link>
          <Link href={`/room-preview/${artwork.id}`}>
            <Button size="sm" variant="secondary">
              Room preview
            </Button>
          </Link>
          <Button size="sm" variant="secondary" onClick={() => onSave(artwork.id)}>
            {savedIds.includes(artwork.id) ? "Saved" : "Save"}
          </Button>
          <Button size="sm" variant="secondary" onClick={() => onConcierge(artwork.id)}>
            Concierge
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
