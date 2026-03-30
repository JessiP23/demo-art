"use client";

import { useMemo, useState } from "react";
import { AuthGuard } from "@/components/auth-guard";
import { PageShell } from "@/components/page-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useArtworks, useConciergeRequests, useCreateConciergeRequest } from "@/lib/queries";
import { useAuthStore } from "@/stores/auth-store";

export default function ConciergePage() {
  const { user } = useAuthStore();
  const artworksQuery = useArtworks();
  const requestsQuery = useConciergeRequests();
  const createMutation = useCreateConciergeRequest(user?.id);
  const [artworkId, setArtworkId] = useState<string>("");
  const [note, setNote] = useState("Need acquisition guidance and logistics support.");
  const [sending, setSending] = useState(false);

  const requests = useMemo(
    () => requestsQuery.data?.filter((entry) => entry.user_id === user?.id) ?? [],
    [requestsQuery.data, user?.id],
  );

  const submit = async () => {
    if (!artworkId) return;
    const request = await createMutation.mutateAsync({ artworkId, note });
    const artwork = artworksQuery.data?.find((item) => item.id === artworkId);
    if (!artwork || !user) return;
    setSending(true);
    await fetch("/api/concierge/notify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: user.email,
        artworkTitle: artwork.title,
        status: request.status,
      }),
    });
    setSending(false);
  };

  return (
    <AuthGuard>
      <PageShell
        title="Concierge workflow"
        subtitle="Submit white-glove acquisition requests and track approval status."
      >
        <div className="grid gap-4 lg:grid-cols-[1fr_1fr]">
          <Card>
            <CardContent className="space-y-3">
              <h2 className="text-xl font-semibold">New request</h2>
              <select
                className="w-full rounded-xl border border-black/10 bg-transparent px-3 py-2 text-sm"
                value={artworkId}
                onChange={(event) => setArtworkId(event.target.value)}
              >
                <option value="">Select artwork</option>
                {artworksQuery.data?.map((artwork) => (
                  <option key={artwork.id} value={artwork.id}>
                    {artwork.title} — {artwork.artist}
                  </option>
                ))}
              </select>
              <Input value={note} onChange={(event) => setNote(event.target.value)} />
              <Button onClick={submit} disabled={createMutation.isPending || sending}>
                {createMutation.isPending || sending ? "Submitting..." : "Submit concierge request"}
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="space-y-3">
              <h2 className="text-xl font-semibold">Your requests</h2>
              {requests.map((request) => {
                const artwork = artworksQuery.data?.find((item) => item.id === request.artwork_id);
                return (
                  <div key={request.id} className="rounded-2xl border border-black/10 p-3">
                    <p className="text-sm font-medium">{artwork?.title ?? request.artwork_id}</p>
                    <p className="mt-1 text-xs text-black/60 dark:text-white/60">{request.note}</p>
                    <div className="mt-2">
                      <Badge className="normal-case tracking-normal">{request.status}</Badge>
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
