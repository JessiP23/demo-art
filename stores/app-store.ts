"use client";

import { create } from "zustand";

export type TasteOption = {
  id: string;
  label: string;
  tags: string[];
  image: string;
};

type AppState = {
  userTaste: string[];
  selectedArtworks: string[];
  viewedArtworks: string[];
  selectedArtworkId: string | null;
  roomImageUrl: string;
  previewEnabled: boolean;
  valuationInput: string;
  valuationResultId: string | null;
  setUserTaste: (taste: string[]) => void;
  toggleTaste: (tasteId: string) => void;
  setSelectedArtworks: (ids: string[]) => void;
  toggleSelectedArtwork: (id: string) => void;
  markViewedArtwork: (id: string) => void;
  setSelectedArtworkId: (id: string | null) => void;
  setRoomImageUrl: (url: string) => void;
  togglePreview: () => void;
  setValuationInput: (value: string) => void;
  setValuationResultId: (value: string | null) => void;
};

export const useAppStore = create<AppState>((set) => ({
  userTaste: [],
  selectedArtworks: [],
  viewedArtworks: [],
  selectedArtworkId: null,
  roomImageUrl: "/dusk.png",
  previewEnabled: true,
  valuationInput: "",
  valuationResultId: null,
  setUserTaste: (userTaste) => set({ userTaste }),
  toggleTaste: (tasteId) =>
    set((state) => ({
      userTaste: state.userTaste.includes(tasteId)
        ? state.userTaste.filter((entry) => entry !== tasteId)
        : [...state.userTaste, tasteId],
    })),
  setSelectedArtworks: (selectedArtworks) => set({ selectedArtworks }),
  toggleSelectedArtwork: (id) =>
    set((state) => ({
      selectedArtworks: state.selectedArtworks.includes(id)
        ? state.selectedArtworks.filter((entry) => entry !== id)
        : [...state.selectedArtworks, id],
    })),
  markViewedArtwork: (id) =>
    set((state) => ({
      viewedArtworks: state.viewedArtworks.includes(id)
        ? state.viewedArtworks
        : [...state.viewedArtworks, id],
    })),
  setSelectedArtworkId: (selectedArtworkId) => set({ selectedArtworkId }),
  setRoomImageUrl: (roomImageUrl) => set({ roomImageUrl }),
  togglePreview: () => set((state) => ({ previewEnabled: !state.previewEnabled })),
  setValuationInput: (valuationInput) => set({ valuationInput }),
  setValuationResultId: (valuationResultId) => set({ valuationResultId }),
}));
