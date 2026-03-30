"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "./ui/button";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="secondary"
      size="sm"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="rounded-full"
    >
      {theme === "dark" ? <Sun className="mr-2 h-3.5 w-3.5" /> : <Moon className="mr-2 h-3.5 w-3.5" />}
      {theme === "dark" ? "Light" : "Dark"}
    </Button>
  );
}
