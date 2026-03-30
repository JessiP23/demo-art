"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PageShell } from "@/components/page-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/stores/auth-store";

export default function AuthPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("collector@artmatch.app");
  const [password, setPassword] = useState("password123");
  const { login, signUp, loading, error, user } = useAuthStore();

  useEffect(() => {
    if (user) {
      router.replace("/onboard");
    }
  }, [router, user]);

  const submit = async () => {
    if (mode === "login") {
      await login(email, password);
    } else {
      await signUp(email, password, name || "Collector");
    }
    const current = useAuthStore.getState().user;
    if (current) {
      router.push("/onboard");
    }
  };

  return (
    <PageShell
      title="Authentication"
      subtitle="Secure collector authentication and profile initialization."
    >
      <Card className="mx-auto w-full max-w-xl">
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Button variant={mode === "login" ? "default" : "secondary"} onClick={() => setMode("login")}>
              Login
            </Button>
            <Button
              variant={mode === "signup" ? "default" : "secondary"}
              onClick={() => setMode("signup")}
            >
              Sign Up
            </Button>
          </div>
          {mode === "signup" ? (
            <Input value={name} onChange={(event) => setName(event.target.value)} placeholder="Full name" />
          ) : null}
          <Input value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Email" />
          <Input
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Password"
            type="password"
          />
          {error ? <p className="text-sm text-red-600">{error}</p> : null}
          <Button onClick={submit} disabled={loading}>
            {loading ? "Loading..." : mode === "login" ? "Login" : "Create account"}
          </Button>
        </CardContent>
      </Card>
    </PageShell>
  );
}
