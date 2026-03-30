"use client";

import Link from "next/link";
import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { AuthGuard } from "@/components/auth-guard";
import { PageShell } from "@/components/page-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { dbApi } from "@/lib/mock-db";
import { useArtworks } from "@/lib/queries";
import { currency } from "@/lib/utils";
import { useAuthStore } from "@/stores/auth-store";

export default function ProfilePage() {
  return (
    <Suspense fallback={null}>
      <ProfilePageContent />
    </Suspense>
  );
}

function ProfilePageContent() {
  const { user, refresh } = useAuthStore();
  const artworksQuery = useArtworks();
  const searchParams = useSearchParams();
  const [loadingSubscription, setLoadingSubscription] = useState(false);
  const purchaseStatus = searchParams.get("purchase");
  const subscriptionStatus = searchParams.get("subscription");

  const savedArtworks = useMemo(
    () => artworksQuery.data?.filter((artwork) => user?.saved_artworks.includes(artwork.id)) ?? [],
    [artworksQuery.data, user?.saved_artworks],
  );

  const transactions = useMemo(
    () => dbApi.listTransactions().filter((transaction) => transaction.user_id === user?.id),
    [user?.id],
  );

  const startSubscription = async () => {
    if (!user) return;
    setLoadingSubscription(true);
    const response = await fetch("/api/subscription", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: user.email, userId: user.id }),
    });
    const data = (await response.json()) as { mode: string; sessionId: string; url?: string };
    if (data.mode === "stripe" && data.url) {
      window.location.assign(data.url);
      return;
    }
    dbApi.updateSubscription(user.id, "pro");
    refresh();
    setLoadingSubscription(false);
  };

  return (
    <AuthGuard>
      <PageShell title="Profile" subtitle="Saved works, transaction history, and subscription status.">
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="md:col-span-2">
            <CardContent className="space-y-4">
              <h2 className="text-xl font-semibold">Saved works</h2>
              {savedArtworks.length === 0 ? (
                <p className="text-sm text-black/60">
                  No saved works yet. Explore recommendations to curate your shortlist.
                </p>
              ) : null}
              {savedArtworks.map((artwork) => (
                <div key={artwork.id} className="flex items-center justify-between rounded-2xl border border-black/10 p-3">
                  <div>
                    <p className="font-medium">{artwork.title}</p>
                    <p className="text-sm text-black/60">{artwork.artist}</p>
                  </div>
                  <Link href={`/artwork/${artwork.id}`}>
                    <Button size="sm" variant="secondary">
                      Open
                    </Button>
                  </Link>
                </div>
              ))}
            </CardContent>
          </Card>
          <Card>
            <CardContent className="space-y-3">
              <h2 className="text-xl font-semibold">Subscription</h2>
              <Badge className="normal-case tracking-normal">
                Tier: {user?.subscription_tier === "pro" ? "Pro Collector" : "Free"}
              </Badge>
              <Button
                onClick={startSubscription}
                disabled={loadingSubscription || user?.subscription_tier === "pro"}
              >
                {user?.subscription_tier === "pro"
                  ? "Pro active"
                  : loadingSubscription
                    ? "Starting..."
                    : "Upgrade to Pro"}
              </Button>
              {subscriptionStatus ? (
                <p className="text-xs text-black/60">Subscription: {subscriptionStatus}</p>
              ) : null}
              {purchaseStatus ? (
                <p className="text-xs text-black/60">Purchase: {purchaseStatus}</p>
              ) : null}
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardContent className="space-y-3">
            <h2 className="text-xl font-semibold">Transactions</h2>
            {transactions.map((transaction) => {
              const artwork = artworksQuery.data?.find((item) => item.id === transaction.artwork_id);
              return (
                <div key={transaction.id} className="rounded-2xl border border-black/10 p-3 text-sm">
                  <p className="font-medium">{artwork?.title ?? transaction.artwork_id}</p>
                  <p className="text-black/60">
                    Amount {currency(transaction.amount)} · Commission {currency(transaction.commission)}
                  </p>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </PageShell>
    </AuthGuard>
  );
}
