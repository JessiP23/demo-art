"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { PageShell } from "@/components/page-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAppStore, type TasteOption } from "@/stores/app-store";

const tasteOptions: TasteOption[] = [
  { id: "minimal", label: "Quiet Minimal", tags: ["minimal", "monochrome"], image: "/7.png" },
  { id: "geometric", label: "Geometric Order", tags: ["geometric", "structured"], image: "/2.png" },
  { id: "layered", label: "Layered Abstraction", tags: ["layered", "textural"], image: "/8.png" },
  { id: "dramatic", label: "Dramatic Contrast", tags: ["dark-toned", "bold"], image: "/4.png" },
  { id: "narrative", label: "Narrative Image", tags: ["narrative", "photography"], image: "/1.png" },
  { id: "architectural", label: "Architectural Line", tags: ["architectural", "linear"], image: "/5.png" },
  { id: "expressive", label: "Expressive Color", tags: ["high-chroma", "expressive"], image: "/6.png" },
  { id: "sculptural", label: "Sculptural Form", tags: ["sculpture", "material-driven"], image: "/sculpture-1.png" },
  { id: "organic", label: "Organic Shapes", tags: ["organic", "textural"], image: "/sculpture-3.png" },
  { id: "balanced", label: "Muted Balance", tags: ["muted", "balanced"], image: "/9.png" },
];

export default function OnboardPage() {
  const router = useRouter();
  const { userTaste, toggleTaste } = useAppStore();

  const selectedCount = userTaste.length;

  const continueFlow = () => {
    router.push("/recommendations");
  };

  return (
    <PageShell
      title="Build your Taste Graph"
      subtitle="Select 5–10 preference cards. The engine uses these signals to produce a finite high-confidence shortlist."
      action={
        <Button size="sm" onClick={continueFlow} disabled={selectedCount < 5}>
          View Curated Results
        </Button>
      }
    >
      <Card>
        <CardContent className="flex flex-wrap items-center justify-between gap-3 p-5">
          <p className="text-xs uppercase tracking-[0.16em] text-black/55">
            Selected {selectedCount} / 10
          </p>
          <p className="font-mono text-xs text-black/65">Minimum signal required: 5 preferences</p>
        </CardContent>
      </Card>
      <div className="grid gap-4 md:grid-cols-2">
        {tasteOptions.map((option, idx) => {
          const selected = userTaste.includes(option.id);
          return (
            <motion.button
              key={option.id}
              type="button"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: idx * 0.04 }}
              whileHover={{ scale: 1.015 }}
              onClick={() => toggleTaste(option.id)}
              className={`overflow-hidden rounded-[1.4rem] border text-left transition ${
                selected ? "border-black bg-black text-white" : "border-black/12 bg-white text-black"
              }`}
            >
              <div className="relative aspect-[16/10] w-full">
                <Image src={option.image} alt={option.label} fill className="object-cover" />
              </div>
              <div className="space-y-2 p-5">
                <p className="text-lg font-semibold tracking-tight">{option.label}</p>
                <p className={`text-xs uppercase tracking-[0.14em] ${selected ? "text-white/75" : "text-black/55"}`}>
                  {option.tags.join(" · ")}
                </p>
              </div>
            </motion.button>
          );
        })}
      </div>
      <div className="flex justify-end">
        <Button onClick={continueFlow} disabled={selectedCount < 5}>
          Continue to curated results
        </Button>
      </div>
    </PageShell>
  );
}
