import { v4 as uuid } from "uuid";
import { type Artwork, type TasteDimension, type TasteProfile, type User } from "./types";

export const tasteDimensions: TasteDimension[] = [
  "minimalism",
  "colorIntensity",
  "figurativeVsAbstract",
  "classicVsContemporary",
  "textureAffinity",
  "scalePreference",
  "riskAppetite",
  "warmVsCoolPalette",
  "narrativeDepth",
  "linearity",
  "collectorConfidence",
  "investmentIntent",
];

export const defaultTasteProfile: TasteProfile = tasteDimensions.reduce(
  (acc, key) => ({ ...acc, [key]: 50 }),
  {} as TasteProfile,
);

export const seedUser: User = {
  id: uuid(),
  email: "collector@artmatch.app",
  name: "Sample Collector",
  password: "password123",
  taste_profile: null,
  subscription_tier: "free",
  saved_artworks: [],
};

export const artworksSeed: Artwork[] = [
  {
    id: "work-1",
    title: "Contour in Ochre",
    artist: "Lena Voss",
    image_url: "/contour-ocre.png",
    price_range: [16000, 19000],
    fair_value_score: 92,
    momentum_score: 84,
    medium: "Acrylic on linen",
    dimensions: '48" × 60"',
    year: "2021",
    embedding: [0.9, 0.2, 0.4, 0.7, 0.5, 0.3],
    auction_comp: "Comparable primary sales +2.8% spread in last 12 months.",
    rationale: [
      "Strong visual fit with warm-neutral interior palettes.",
      "Institutional exhibition cadence supports value resilience.",
      "Ideal first acquisition in $15k–$25k confidence band.",
    ],
  },
  {
    id: "work-2",
    title: "Field Signals",
    artist: "Noah Imani",
    image_url: "/dusk.png",
    price_range: [10000, 13000],
    fair_value_score: 88,
    momentum_score: 79,
    medium: "Pigment print",
    dimensions: '40" × 40"',
    year: "2020",
    embedding: [0.7, 0.5, 0.3, 0.4, 0.8, 0.6],
    auction_comp: "Edition velocity stable across two seasonal cycles.",
    rationale: [
      "Balanced geometry aligns to structured taste profile.",
      "Lower downside band for first-time online buyers.",
      "Compact format is room-flexible across urban layouts.",
    ],
  },
  {
    id: "work-3",
    title: "River Signal",
    artist: "Aya Mercier",
    image_url: "/quiet-frequency.png",
    price_range: [22000, 25000],
    fair_value_score: 94,
    momentum_score: 91,
    medium: "Mixed media on canvas",
    dimensions: '36" × 54"',
    year: "2022",
    embedding: [0.8, 0.9, 0.2, 0.5, 0.7, 0.9],
    auction_comp: "Below median placement versus recent gallery comps.",
    rationale: [
      "High signal for confident color-forward collectors.",
      "Strong artist momentum with museum acquisition tailwinds.",
      "Brokerage path includes insured logistics in quoted price.",
    ],
  },
];
