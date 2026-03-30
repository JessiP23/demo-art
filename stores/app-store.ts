"use client";

import { create } from "zustand";

type AppState = {
  selectedArtworkId: string | null;
  roomImageUrl: string;
  previewEnabled: boolean;
  conciergeRequested: boolean;
  setSelectedArtworkId: (id: string | null) => void;
  setRoomImageUrl: (url: string) => void;
  togglePreview: () => void;
  setConciergeRequested: (value: boolean) => void;
};

export const useAppStore = create<AppState>((set) => ({
  selectedArtworkId: null,
  roomImageUrl: "/dusk.png",
  previewEnabled: true,
  conciergeRequested: false,
  setSelectedArtworkId: (selectedArtworkId) => set({ selectedArtworkId }),
  setRoomImageUrl: (roomImageUrl) => set({ roomImageUrl }),
  togglePreview: () => set((state) => ({ previewEnabled: !state.previewEnabled })),
  setConciergeRequested: (conciergeRequested) => set({ conciergeRequested }),
}));
