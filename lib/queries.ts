"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { buildRecommendations } from "./engines";
import { dbApi } from "./mock-db";
import type { Artwork, ConciergeRequest, TasteProfile } from "./types";

export function useArtworks() {
  return useQuery({
    queryKey: ["artworks"],
    queryFn: async () => dbApi.getArtworks(),
  });
}

export function useArtwork(artworkId: string) {
  return useQuery({
    queryKey: ["artwork", artworkId],
    queryFn: async () => dbApi.getArtwork(artworkId),
    enabled: Boolean(artworkId),
  });
}

export function useRecommendations(userId?: string, tasteProfile?: TasteProfile | null) {
  return useQuery({
    queryKey: ["recommendations", userId, tasteProfile],
    queryFn: async () => {
      if (!userId || !tasteProfile) return [];
      const artworks = dbApi.getArtworks();
      return buildRecommendations(userId, tasteProfile, artworks);
    },
    enabled: Boolean(userId && tasteProfile),
  });
}

export function useSaveArtwork(userId?: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (artworkId: string) => {
      if (!userId) throw new Error("Please login first");
      return dbApi.saveArtwork(userId, artworkId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });
}

export function useConciergeRequests() {
  return useQuery({
    queryKey: ["concierge_requests"],
    queryFn: async () => dbApi.listConciergeRequests(),
  });
}

export function useCreateConciergeRequest(userId?: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ artworkId, note }: { artworkId: string; note: string }) => {
      if (!userId) throw new Error("Please login first");
      return dbApi.createConciergeRequest(userId, artworkId, note);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["concierge_requests"] });
    },
  });
}

export function useAdminUpsertArtwork() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (artwork: Artwork) => dbApi.upsertArtwork(artwork),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["artworks"] });
    },
  });
}

export function useUpdateConciergeStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      requestId,
      status,
    }: {
      requestId: string;
      status: ConciergeRequest["status"];
    }) => dbApi.updateConciergeStatus(requestId, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["concierge_requests"] });
    },
  });
}

export function useAnalytics() {
  return useQuery({
    queryKey: ["analytics"],
    queryFn: async () => dbApi.analytics(),
  });
}
