import * as React from "react";
import { cn } from "@/lib/utils";

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          "h-11 w-full rounded-2xl border border-black/15 bg-white px-4 text-sm text-black outline-none transition focus:border-black/40",
          className,
        )}
        {...props}
      />
    );
  },
);

Input.displayName = "Input";
