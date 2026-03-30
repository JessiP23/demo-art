"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { AuthGuard } from "@/components/auth-guard";
import { PageShell } from "@/components/page-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { artistMomentumLabel, fairValueBand } from "@/lib/engines";
import { useArtwork } from "@/lib/queries";
import { currency } from "@/lib/utils";

export default function ArtworkDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const artworkQuery = useArtwork(params.id);

  const artwork = artworkQuery.data;
  const fairValue = artwork ? fairValueBand(artwork) : null;

  return (
    <AuthGuard>
      <PageShell title="Artwork detail" subtitle="Match rationale, fair value, and artist momentum intelligence.">
        {!artwork ? null : (
          <div className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
            <Card>
              <CardContent className="p-3">
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
                  <Image src={artwork.image_url} alt={artwork.title} fill className="object-cover" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.16em] text-black/55">
                    {artwork.artist}
                  </p>
                  <h2 className="mt-2 text-3xl font-semibold tracking-tight">{artwork.title}</h2>
                  <p className="mt-1 text-sm text-black/65">
                    {artwork.medium} · {artwork.dimensions} · {artwork.year}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge className="normal-case tracking-normal">
                    Guide {currency(artwork.price_range[0])}–{currency(artwork.price_range[1])}
                  </Badge>
                  <Badge className="normal-case tracking-normal">
                    Fair value confidence {fairValue?.confidence ?? 0}%
                  </Badge>
                  <Badge className="normal-case tracking-normal">
                    Momentum: {artistMomentumLabel(artwork.momentum_score)}
                  </Badge>
                </div>
                <div className="rounded-2xl border border-black/10 p-4">
                  <p className="text-sm font-medium">Fair Value Engine</p>
                  <p className="mt-2 text-sm text-black/70">
                    Estimated fair range {currency(fairValue?.low ?? 0)}–{currency(fairValue?.high ?? 0)}
                  </p>
                  <p className="mt-2 text-sm text-black/70">{artwork.auction_comp}</p>
                </div>
                <div className="rounded-2xl border border-black/10 p-4">
                  <p className="text-sm font-medium">Explainable rationale</p>
                  <ul className="mt-2 space-y-2 text-sm text-black/70">
                    {artwork.rationale.map((reason) => (
                      <li key={reason}>• {reason}</li>
                    ))}
                  </ul>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Link href={`/room-preview/${artwork.id}`}>
                    <Button>Open room preview</Button>
                  </Link>
                  <Link href={`/checkout/${artwork.id}`}>
                    <Button variant="secondary">Proceed to checkout</Button>
                  </Link>
                  <Button variant="secondary" onClick={() => router.push("/concierge")}>
                    Request concierge
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </PageShell>
    </AuthGuard>
  );
}
