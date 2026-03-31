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

export function buildCuratedRecommendations({
  tasteTags,
  artworks,
  limit = 5,
}: {
  tasteTags: string[];
  artworks: Artwork[];
  limit?: number;
}) {
  const normalizedTaste = tasteTags.map((entry) => entry.toLowerCase());
  return artworks
    .map((artwork) => {
      const tagHits = artwork.style_tags.filter((tag) =>
        normalizedTaste.some((taste) => tag.toLowerCase().includes(taste)),
      ).length;
      const matchScore = Math.min(
        97,
        Math.max(72, artwork.fair_value_score - 8 + artwork.momentum_score * 0.25 + tagHits * 4),
      );
      return {
        artwork,
        matchScore: Math.round(matchScore),
      };
    })
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, limit);
}

export function fairValueBand(artwork: Artwork) {
  const [low, high] = artwork.valuation_range;
  const spread = Math.max(500, Math.round((high - low) * 0.12));
  return {
    low: Math.max(1000, low - spread),
    high: high + spread,
    confidence: Math.min(98, artwork.fair_value_score + 2),
  };
}

export function fairValueStatus(artwork: Artwork) {
  const [low, high] = artwork.valuation_range;
  if (artwork.price_eur < low) return "Undervalued";
  if (artwork.price_eur > high) return "Overpriced";
  return "Fairly priced";
}

export function valuationConfidence(score: number) {
  if (score >= 90) return "High";
  if (score >= 80) return "Medium";
  return "Low";
}

export function buildMomentumSeries(score: number) {
  const base = Math.max(35, Math.min(95, score - 12));
  return Array.from({ length: 8 }).map((_, idx) =>
    Math.max(25, Math.min(99, Math.round(base + idx * 2 + (idx % 2 === 0 ? 2 : -1)))),
  );
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
