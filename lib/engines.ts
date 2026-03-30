import type { Artwork, Recommendation, TasteProfile } from "./types";

const tasteVectorKeys = [
  "minimalism",
  "colorIntensity",
  "figurativeVsAbstract",
  "classicVsContemporary",
  "textureAffinity",
  "scalePreference",
] as const;

export function profileToEmbedding(profile: TasteProfile) {
  return tasteVectorKeys.map((key) => Number(profile[key] ?? 50) / 100);
}

export function computeRecommendationScore(embeddingA: number[], embeddingB: number[]) {
  const score = embeddingA.reduce((acc, value, idx) => acc + value * (embeddingB[idx] ?? 0), 0);
  return Math.min(99, Math.max(1, Math.round(score * 100)));
}

export function buildRecommendations(
  userId: string,
  profile: TasteProfile,
  artworks: Artwork[],
): Recommendation[] {
  const userEmbedding = profileToEmbedding(profile);
  return artworks
    .map((artwork) => {
      const matchScore = computeRecommendationScore(userEmbedding, artwork.embedding);
      return {
        user_id: userId,
        artwork_id: artwork.id,
        match_score: matchScore,
        rationale: artwork.rationale[0] ?? "Strong fit against your preference graph.",
      };
    })
    .sort((a, b) => b.match_score - a.match_score);
}

export function fairValueBand(artwork: Artwork) {
  const [low, high] = artwork.price_range;
  const spread = Math.max(800, Math.round((high - low) * 0.18));
  return {
    low: low - spread,
    high: high + spread,
    confidence: Math.min(98, artwork.fair_value_score + 2),
  };
}

export function artistMomentumLabel(score: number) {
  if (score >= 90) return "Institutional acceleration";
  if (score >= 80) return "High collector momentum";
  if (score >= 70) return "Stable market traction";
  return "Emerging visibility";
}

export function calculateCommission(amount: number) {
  return Number((amount * 0.12).toFixed(2));
}

export async function generateRoomPreview({
  artworkUrl,
  roomImageUrl,
}: {
  artworkUrl: string;
  roomImageUrl: string;
}) {
  await new Promise((resolve) => setTimeout(resolve, 800));
  return {
    previewUrl: roomImageUrl,
    overlayArtworkUrl: artworkUrl,
    model: "stable-diffusion-mock-v1",
    confidence: 0.91,
  };
}
