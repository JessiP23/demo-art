"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/", label: "Home" },
  { href: "/onboard", label: "Taste Profile" },
  { href: "/recommendations", label: "Curated Results" },
  { href: "/audit", label: "Value Audit" },
];

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-black/10 bg-[var(--background)]/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-8">
        <Link href="/" className="text-sm font-semibold uppercase tracking-[0.2em]">
          ArtMatch
        </Link>
        <nav className="hidden items-center gap-5 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-xs uppercase tracking-[0.15em] text-black/60 transition hover:text-black",
                pathname === item.href && "text-black",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Link href="/onboard" className="text-xs uppercase tracking-[0.15em] text-black/60 hover:text-black">
          Start
        </Link>
      </div>
    </header>
  );
}
