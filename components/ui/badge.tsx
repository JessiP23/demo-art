import { cn } from "@/lib/utils";

export function Badge({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex rounded-full border border-black/10 px-3 py-1 text-xs uppercase tracking-[0.14em] text-black/65",
        className,
      )}
    >
      {children}
    </span>
  );
}
