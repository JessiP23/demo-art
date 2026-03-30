"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuthStore } from "@/stores/auth-store";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { user } = useAuthStore();

  useEffect(() => {
    if (!user) {
      router.replace("/auth");
    }
  }, [router, user]);

  if (!user) {
    return null;
  }

  return <>{children}</>;
}
