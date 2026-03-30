"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { AuthGuard } from "@/components/auth-guard";
import { PageShell } from "@/components/page-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { defaultTasteProfile, tasteDimensions } from "@/lib/mock-data";
import { dbApi } from "@/lib/mock-db";
import type { TasteDimension, TasteProfile } from "@/lib/types";
import { useAuthStore } from "@/stores/auth-store";

const labels: Record<TasteDimension, string> = {
  minimalism: "Minimalism",
  colorIntensity: "Color intensity",
  figurativeVsAbstract: "Figurative vs abstract",
  classicVsContemporary: "Classic vs contemporary",
  textureAffinity: "Texture affinity",
  scalePreference: "Scale preference",
  riskAppetite: "Risk appetite",
  warmVsCoolPalette: "Warm vs cool palette",
  narrativeDepth: "Narrative depth",
  linearity: "Linearity",
  collectorConfidence: "Collector confidence",
  investmentIntent: "Investment intent",
};

export default function OnboardPage() {
  const router = useRouter();
  const { user, refresh } = useAuthStore();
  const [index, setIndex] = useState(0);
  const [values, setValues] = useState<TasteProfile>(user?.taste_profile ?? defaultTasteProfile);

  const dimension = tasteDimensions[index];

  const updateValue = (delta: number) => {
    const current = values[dimension];
    const next = Math.max(0, Math.min(100, current + delta));
    setValues((state) => ({ ...state, [dimension]: next }));
  };

  const saveProfile = () => {
    if (!user) return;
    dbApi.updateTasteProfile(user.id, values);
    refresh();
    router.push("/recommendations");
  };

  return (
    <AuthGuard>
      <PageShell
        title="Taste onboarding"
        subtitle="Swipe-style calibration across 12 dimensions for explainable matching."
      >
        <Card className="mx-auto w-full max-w-2xl">
          <CardContent className="space-y-5">
            <p className="text-xs uppercase tracking-[0.18em] text-black/55">
              Dimension {index + 1} of {tasteDimensions.length}
            </p>
            <motion.div
              key={dimension}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.25 }}
              className="rounded-2xl border border-black/10 p-5"
            >
              <h2 className="text-2xl font-semibold tracking-tight">{labels[dimension]}</h2>
              <p className="mt-2 text-sm text-black/65">
                Current intensity: {values[dimension]} / 100
              </p>
              <div className="mt-4 flex gap-2">
                <Button variant="secondary" onClick={() => updateValue(-10)}>
                  Swipe Left
                </Button>
                <Button onClick={() => updateValue(10)}>Swipe Right</Button>
              </div>
            </motion.div>
            <div className="flex flex-wrap gap-2">
              <Button
                variant="secondary"
                onClick={() => setIndex((current) => Math.max(0, current - 1))}
                disabled={index === 0}
              >
                Previous
              </Button>
              <Button
                variant="secondary"
                onClick={() => setIndex((current) => Math.min(tasteDimensions.length - 1, current + 1))}
                disabled={index === tasteDimensions.length - 1}
              >
                Next
              </Button>
              <Button onClick={saveProfile}>Save taste profile</Button>
            </div>
          </CardContent>
        </Card>
      </PageShell>
    </AuthGuard>
  );
}
