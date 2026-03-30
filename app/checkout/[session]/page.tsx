"use client";

import { Suspense, useMemo, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { AuthGuard } from "@/components/auth-guard";
import { PageShell } from "@/components/page-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { calculateCommission } from "@/lib/engines";
import { dbApi } from "@/lib/mock-db";
import { useArtwork } from "@/lib/queries";
import { currency } from "@/lib/utils";
import { useAuthStore } from "@/stores/auth-store";

export default function CheckoutPage() {
  return (
    <Suspense fallback={null}>
      <CheckoutPageContent />
    </Suspense>
  );
}

function CheckoutPageContent() {
  const params = useParams<{ session: string }>();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useAuthStore();
  const artworkQuery = useArtwork(params.session);
  const [loading, setLoading] = useState(false);
  const [checkoutSession, setCheckoutSession] = useState<string | null>(null);

  const artwork = artworkQuery.data;
  const amount = useMemo(
    () => (artwork ? Math.round((artwork.price_range[0] + artwork.price_range[1]) / 2) : 0),
    [artwork],
  );
  const commission = calculateCommission(amount);

  const purchaseStatus = searchParams.get("purchase");

  const startCheckout = async () => {
    if (!artwork || !user) return;
    setLoading(true);
    const response = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        artworkId: artwork.id,
        title: artwork.title,
        amount,
        userId: user.id,
      }),
    });
    const data = (await response.json()) as { mode: string; url?: string; sessionId: string };
    setCheckoutSession(data.sessionId);
    if (data.mode === "stripe" && data.url) {
      window.location.assign(data.url);
      return;
    }
    dbApi.createTransaction({
      user_id: user.id,
      artwork_id: artwork.id,
      amount,
      commission,
      checkout_session: data.sessionId,
    });
    setLoading(false);
    router.push("/profile?purchase=success");
  };

  return (
    <AuthGuard>
      <PageShell
        title="Checkout"
        subtitle="Secure acquisition checkout with transparent ArtMatch commission."
      >
        {artwork ? (
          <Card className="mx-auto w-full max-w-xl">
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-black/60 dark:text-white/60">{artwork.artist}</p>
                <h2 className="text-2xl font-semibold">{artwork.title}</h2>
              </div>
              <div className="space-y-1 text-sm">
                <p>Artwork amount: {currency(amount)}</p>
                <p>ArtMatch commission (12%): {currency(commission)}</p>
                <p className="font-medium">Total: {currency(amount + commission)}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge className="normal-case tracking-normal">
                  {checkoutSession ? `Session ${checkoutSession}` : "No session yet"}
                </Badge>
                {purchaseStatus ? (
                  <Badge className="normal-case tracking-normal">Status: {purchaseStatus}</Badge>
                ) : null}
              </div>
              <Button onClick={startCheckout} disabled={loading}>
                {loading ? "Starting checkout..." : "Continue to payment"}
              </Button>
            </CardContent>
          </Card>
        ) : null}
      </PageShell>
    </AuthGuard>
  );
}
