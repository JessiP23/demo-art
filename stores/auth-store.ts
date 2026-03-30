"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { dbApi } from "@/lib/mock-db";
import type { User } from "@/lib/types";

type AuthState = {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  refresh: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      loading: false,
      error: null,
      async login(email, password) {
        set({ loading: true, error: null });
        try {
          const user = dbApi.login(email, password);
          set({ user, loading: false });
        } catch (error) {
          set({ loading: false, error: (error as Error).message });
        }
      },
      async signUp(email, password, name) {
        set({ loading: true, error: null });
        try {
          const user = dbApi.signUp(email, password, name);
          set({ user, loading: false });
        } catch (error) {
          set({ loading: false, error: (error as Error).message });
        }
      },
      logout() {
        set({ user: null, error: null });
      },
      refresh() {
        const id = get().user?.id;
        if (!id) return;
        const user = dbApi.getUser(id);
        if (user) {
          set({ user });
        }
      },
    }),
    {
      name: "artmatch_auth",
      partialize: (state) => ({ user: state.user }),
    },
  ),
);
