export type SubscriptionTier = "free" | "pro";

export type TasteDimension =
  | "minimalism"
  | "colorIntensity"
  | "figurativeVsAbstract"
  | "classicVsContemporary"
  | "textureAffinity"
  | "scalePreference"
  | "riskAppetite"
  | "warmVsCoolPalette"
  | "narrativeDepth"
  | "linearity"
  | "collectorConfidence"
  | "investmentIntent";

export type TasteProfile = Record<TasteDimension, number>;

export type User = {
  id: string;
  email: string;
  name: string;
  password: string;
  taste_profile: TasteProfile | null;
  subscription_tier: SubscriptionTier;
  saved_artworks: string[];
};

export type Artwork = {
  id: string;
  title: string;
  artist: string;
  image_url: string;
  price_range: [number, number];
  price_eur: number;
  valuation_range: [number, number];
  fair_value_score: number;
  momentum_score: number;
  medium: string;
  dimensions: string;
  year: string;
  embedding: number[];
  auction_comp: string;
  rationale: string[];
  style_tags: string[];
  match_explanation: string;
};

export type Recommendation = {
  user_id: string;
  artwork_id: string;
  match_score: number;
  rationale: string;
};

export type ConciergeRequestStatus = "pending" | "approved" | "declined";

export type ConciergeRequest = {
  id: string;
  user_id: string;
  artwork_id: string;
  status: ConciergeRequestStatus;
  note: string;
  created_at: string;
};

export type Transaction = {
  id: string;
  user_id: string;
  artwork_id: string;
  amount: number;
  commission: number;
  checkout_session: string;
  created_at: string;
};

export type Analytics = {
  users: number;
  artworks: number;
  conciergePending: number;
  transactions: number;
  gmv: number;
};
