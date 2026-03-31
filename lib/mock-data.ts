import { v4 as uuid } from "uuid";
import artworks from "./artworks.json";
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

export const artworksSeed: Artwork[] = artworks as Artwork[];
