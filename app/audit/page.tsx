"use client";

import Image from "next/image";
import { useMemo } from "react";
import { PageShell } from "@/components/page-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { fairValueBand, valuationConfidence } from "@/lib/engines";
import { useArtworks } from "@/lib/queries";
import { currency } from "@/lib/utils";
import { useAppStore } from "@/stores/app-store";

export default function AuditPage() {
  const artworksQuery = useArtworks();
  const { valuationInput, setValuationInput, valuationResultId, setValuationResultId } = useAppStore();
  const artworks = artworksQuery.data;

  const generateAudit = () => {
    if (!artworks?.length) {
      setValuationResultId(null);
      return;
    }
    const source = valuationInput.trim().toLowerCase() || "default-audit";
    const hash = Array.from(source).reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const target = artworks[hash % artworks.length];
    setValuationResultId(target?.id ?? null);
  };

  const selected = useMemo(() => {
    if (!artworks?.length) return null;
    if (valuationResultId) {
      return artworks.find((artwork) => artwork.id === valuationResultId) ?? null;
    }
    return artworks[0] ?? null;
  }, [artworks, valuationResultId]);

  const comparables = useMemo(() => {
    if (!selected) return [];
    return (artworks ?? []).filter((entry) => entry.id !== selected.id).slice(0, 3);
  }, [artworks, selected]);

  const band = selected ? fairValueBand(selected) : null;

  return (
    <PageShell
      title="Fair Value Audit"
      subtitle="Paste an artwork link or upload a sample image to generate a decision-grade valuation report."
    >
      <Card>
        <CardContent className="space-y-4 p-5">
          <p className="text-xs uppercase tracking-[0.15em] text-black/55">Input</p>
          <div className="grid gap-3 md:grid-cols-[1fr_auto_auto]">
            <input
              value={valuationInput}
              onChange={(event) => setValuationInput(event.target.value)}
              placeholder="Paste artwork link"
              className="h-11 rounded-full border border-black/15 px-4 text-sm outline-none focus:border-black/45"
            />
            <Button variant="secondary">Upload image</Button>
            <Button onClick={generateAudit}>Generate audit</Button>
          </div>
        </CardContent>
      </Card>
      {!selected ? null : (
        <Card>
          <CardContent className="space-y-5 p-5">
            <div className="grid gap-5 md:grid-cols-[0.8fr_1.2fr]">
              <div className="relative aspect-square overflow-hidden rounded-2xl">
                <Image src={selected.image_url} alt={selected.title} fill className="object-cover" />
              </div>
              <div className="space-y-3">
                <p className="text-xs uppercase tracking-[0.16em] text-black/55">Report</p>
                <h2 className="text-2xl font-semibold tracking-tight">{selected.title}</h2>
                <p className="text-sm text-black/70">{selected.artist}</p>
                <div className="rounded-2xl border border-black/10 p-4">
                  <p className="font-mono text-sm">Estimated value: {currency(selected.price_eur)}</p>
                  <p className="mt-2 font-mono text-sm text-black/70">
                    Range: {currency(band?.low ?? 0)} – {currency(band?.high ?? 0)}
                  </p>
                  <p className="mt-2 text-sm text-black/70">
                    Confidence: {valuationConfidence(selected.fair_value_score)}
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-[0.16em] text-black/55">Comparables</p>
              <div className="grid gap-3 md:grid-cols-3">
                {comparables.map((item) => (
                  <div key={item.id} className="rounded-2xl border border-black/10 p-3">
                    <div className="relative aspect-square overflow-hidden rounded-xl">
                      <Image src={item.image_url} alt={item.title} fill className="object-cover" />
                    </div>
                    <p className="mt-3 text-sm font-medium">{item.title}</p>
                    <p className="mt-1 font-mono text-xs text-black/65">{currency(item.price_eur)}</p>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </PageShell>
  );
}
