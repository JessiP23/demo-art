"use client";

import { useState } from "react";
import { AuthGuard } from "@/components/auth-guard";
import { PageShell } from "@/components/page-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAdminUpsertArtwork, useAnalytics, useArtworks, useConciergeRequests, useUpdateConciergeStatus } from "@/lib/queries";
import { dbApi } from "@/lib/mock-db";
import type { Artwork } from "@/lib/types";

const emptyArtwork: Artwork = {
  id: "",
  title: "",
  artist: "",
  image_url: "/contour-ocre.png",
  price_range: [10000, 14000],
  price_eur: 12000,
  valuation_range: [10500, 13200],
  fair_value_score: 80,
  momentum_score: 75,
  medium: "Acrylic on canvas",
  dimensions: '40" × 50"',
  year: "2024",
  embedding: [0.5, 0.5, 0.5, 0.5, 0.5, 0.5],
  auction_comp: "Primary and secondary comps are stable.",
  rationale: ["Balanced profile fit for first-time collector confidence."],
  style_tags: ["abstraction", "balanced"],
  match_explanation: "Matches a balanced contemporary taste profile.",
};

export default function AdminPage() {
  const analyticsQuery = useAnalytics();
  const artworksQuery = useArtworks();
  const requestsQuery = useConciergeRequests();
  const upsertArtwork = useAdminUpsertArtwork();
  const updateConcierge = useUpdateConciergeStatus();
  const [form, setForm] = useState<Artwork>(emptyArtwork);

  const allUsers = dbApi.listUsers();

  const submitArtwork = async () => {
    const payload: Artwork = {
      ...form,
      id: form.id || `work-${Date.now()}`,
    };
    await upsertArtwork.mutateAsync(payload);
    setForm(emptyArtwork);
  };

  const updateStatus = async (requestId: string, status: "approved" | "declined") => {
    const request = await updateConcierge.mutateAsync({ requestId, status });
    const user = allUsers.find((entry) => entry.id === request.user_id);
    const artwork = artworksQuery.data?.find((entry) => entry.id === request.artwork_id);
    if (!user || !artwork) return;
    await fetch("/api/concierge/notify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: user.email,
        artworkTitle: artwork.title,
        status,
      }),
    });
  };

  return (
    <AuthGuard>
      <PageShell
        title="Admin"
        subtitle="Artist onboarding, inventory management, concierge approvals, and analytics."
      >
        <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          <Metric label="Users" value={analyticsQuery.data?.users ?? 0} />
          <Metric label="Artworks" value={analyticsQuery.data?.artworks ?? 0} />
          <Metric label="Concierge Pending" value={analyticsQuery.data?.conciergePending ?? 0} />
          <Metric label="Transactions" value={analyticsQuery.data?.transactions ?? 0} />
          <Metric label="GMV" value={`$${analyticsQuery.data?.gmv ?? 0}`} />
        </section>

        <div className="grid gap-4 lg:grid-cols-[1fr_1fr]">
          <Card>
            <CardContent className="space-y-3">
              <h2 className="text-xl font-semibold">Artist and inventory management</h2>
              <Input
                value={form.id}
                onChange={(event) => setForm((state) => ({ ...state, id: event.target.value }))}
                placeholder="Artwork ID (optional for new)"
              />
              <Input
                value={form.title}
                onChange={(event) => setForm((state) => ({ ...state, title: event.target.value }))}
                placeholder="Title"
              />
              <Input
                value={form.artist}
                onChange={(event) => setForm((state) => ({ ...state, artist: event.target.value }))}
                placeholder="Artist"
              />
              <Input
                value={String(form.price_range[0])}
                onChange={(event) =>
                  setForm((state) => ({ ...state, price_range: [Number(event.target.value || 0), state.price_range[1]] }))
                }
                placeholder="Low price"
                type="number"
              />
              <Input
                value={String(form.price_range[1])}
                onChange={(event) =>
                  setForm((state) => ({ ...state, price_range: [state.price_range[0], Number(event.target.value || 0)] }))
                }
                placeholder="High price"
                type="number"
              />
              <Button onClick={submitArtwork} disabled={upsertArtwork.isPending}>
                {upsertArtwork.isPending ? "Saving..." : "Save artwork"}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="space-y-3">
              <h2 className="text-xl font-semibold">Concierge approvals</h2>
              {requestsQuery.data?.map((request) => {
                const artwork = artworksQuery.data?.find((entry) => entry.id === request.artwork_id);
                return (
                  <div key={request.id} className="rounded-2xl border border-black/10 p-3">
                    <p className="font-medium">{artwork?.title ?? request.artwork_id}</p>
                    <div className="mt-2 flex flex-wrap items-center gap-2">
                      <Badge className="normal-case tracking-normal">{request.status}</Badge>
                      <Button size="sm" onClick={() => updateStatus(request.id, "approved")}>
                        Approve
                      </Button>
                      <Button size="sm" variant="secondary" onClick={() => updateStatus(request.id, "declined")}>
                        Decline
                      </Button>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>
      </PageShell>
    </AuthGuard>
  );
}

function Metric({ label, value }: { label: string; value: string | number }) {
  return (
    <Card>
      <CardContent className="p-4">
        <p className="text-xs uppercase tracking-[0.14em] text-black/55">{label}</p>
        <p className="mt-2 text-2xl font-semibold">{value}</p>
      </CardContent>
    </Card>
  );
}
