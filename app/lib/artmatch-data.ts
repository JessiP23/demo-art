export type TasteProfile = {
  collectorType: string;
  palette: string;
  mood: string;
  budgetBand: string;
  roomType: string;
  style: string;
};

export type Artwork = {
  id: string;
  title: string;
  artist: string;
  year: string;
  medium: string;
  dimensions: string;
  askPrice: number;
  fairValueLow: number;
  fairValueHigh: number;
  fairValueScore: number;
  matchScore: number;
  image: string;
  conciseReason: string;
  artistMomentum: string;
  whyItMatches: string[];
  fairValueRationale: string[];
  roomFit: string;
};

export type MarketMetric = {
  label: string;
  value: string;
};

export type Option = {
  label: string;
  value: string;
};

export type CompetitiveRow = {
  category: string;
  artmatch: string;
  incumbents: string;
};

export const defaultTasteProfile: TasteProfile = {
  collectorType: "HENRY buyer",
  palette: "Warm neutrals",
  mood: "Calm but modern",
  budgetBand: "$12k–$30k",
  roomType: "Living room",
  style: "Textural abstraction",
};

export const styleSignals = [
  "Minimal abstraction",
  "Soft geometry",
  "Muted earth tones",
  "Museum-edition photography",
  "Textural canvas",
];

export const styleOptions: Option[] = [
  { label: "Textural abstraction", value: "Textural abstraction" },
  { label: "Graphic figurative", value: "Graphic figurative" },
  { label: "Chromatic statement", value: "Chromatic statement" },
];

export const paletteOptions: Option[] = [
  { label: "Warm neutrals", value: "Warm neutrals" },
  { label: "Monochrome calm", value: "Monochrome calm" },
  { label: "Bold color energy", value: "Bold color energy" },
];

export const moodOptions: Option[] = [
  { label: "Calm but modern", value: "Calm but modern" },
  { label: "Expressive edge", value: "Expressive edge" },
  { label: "Gallery minimal", value: "Gallery minimal" },
];

export const roomOptions: Option[] = [
  { label: "Living room", value: "Living room" },
  { label: "Dining room", value: "Dining room" },
  { label: "Study", value: "Study" },
];

export const budgetBands = ["$5k–$12k", "$12k–$30k", "$30k–$50k"];

export const artworks: Artwork[] = [
  {
    id: "a1",
    title: "Contour in Ochre",
    artist: "Lena Voss",
    year: "2021",
    medium: "Acrylic on linen",
    dimensions: '48" × 60"',
    askPrice: 18200,
    fairValueLow: 16900,
    fairValueHigh: 19100,
    fairValueScore: 92,
    matchScore: 95,
    image: "/contour-ocre.png",
    conciseReason: "Warm tonal layering and structured movement fit your room profile.",
    artistMomentum: "3 institutional group shows in 18 months; collector waitlist expanding.",
    whyItMatches: [
      "Color temperature mirrors your warm-neutral palette.",
      "Scale anchors a primary seating wall without visual noise.",
      "Artist trajectory aligns with collectors entering the $15k–$25k band.",
    ],
    fairValueRationale: [
      "Ask is 2.8% above comparable primary sales in the last 12 months.",
      "Recent institutional group show supports pricing resilience.",
      "Condition, provenance, and framing all verified pre-offer.",
    ],
    roomFit:
      "Works best centered over a 90–110 inch sofa with 6–8 inch breathing room.",
  },
  {
    id: "a2",
    title: "Quiet Frequency",
    artist: "Noah Imani",
    year: "2020",
    medium: "Pigment print, edition of 8",
    dimensions: '40" × 40"',
    askPrice: 11400,
    fairValueLow: 10900,
    fairValueHigh: 12600,
    fairValueScore: 89,
    matchScore: 91,
    image: "/dusk.png",
    conciseReason: "Muted geometry supports a serene, investment-grade first acquisition.",
    artistMomentum: "Sell-through rate above 78% across two recent primary market releases.",
    whyItMatches: [
      "Photographic geometry matches your preference for refined lines.",
      "Square format complements compact city-living layouts.",
      "Edition depth remains low, preserving scarcity.",
    ],
    fairValueRationale: [
      "Ask sits inside modeled fair-value band.",
      "Comparable auction velocity remained stable across two seasons.",
      "Secondary spread indicates limited downside at this entry.",
    ],
    roomFit:
      "Ideal on a reading-nook wall or entry console zone with directional lighting.",
  },
  {
    id: "a3",
    title: "River Signal",
    artist: "Aya Mercier",
    year: "2022",
    medium: "Mixed media on canvas",
    dimensions: '36" × 54"',
    askPrice: 23600,
    fairValueLow: 22100,
    fairValueHigh: 24800,
    fairValueScore: 94,
    matchScore: 93,
    image: "/quiet-frequency.png",
    conciseReason: "Color confidence adds distinction while preserving compositional balance.",
    artistMomentum: "Recent museum acquisition and cross-market demand from design-led buyers.",
    whyItMatches: [
      "Textural layering maps to your calm-but-modern signal.",
      "Horizontal composition balances open-plan architecture.",
      "Emerging artist upside without speculative pricing.",
    ],
    fairValueRationale: [
      "Ask is 1.6% below median of recent gallery placements.",
      "Strong provenance packet reduces authentication risk.",
      "Broker-negotiated logistics and insurance included in execution path.",
    ],
    roomFit:
      "Strong candidate for dining or lounge walls with natural afternoon light.",
  },
];

export const marketMetrics: MarketMetric[] = [
  { label: "Online art market", value: "$10.5B" },
  { label: "Total global art market", value: "$57.5B" },
  { label: "Transactions", value: "40.5M" },
  { label: "Target AOV", value: "$5k–$50k" },
  { label: "Primary customer", value: "HENRY buyers" },
  { label: "MVP timeline", value: "4–6 weeks" },
  { label: "Budget", value: "Lean pre-seed estimate" },
];

export const competitiveRows: CompetitiveRow[] = [
  {
    category: "Match quality",
    artmatch: "Explainable taste graph + room context",
    incumbents: "Keyword browse and trend feeds",
  },
  {
    category: "Price confidence",
    artmatch: "Fair-value band with rationale",
    incumbents: "Opaque list pricing",
  },
  {
    category: "Execution",
    artmatch: "Concierge-backed brokerage flow",
    incumbents: "Self-serve inquiry threads",
  },
];
