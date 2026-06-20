"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { THEME_NAMES, THEME_LABEL, type ThemeName } from "@/lib/m3-theme";

type ThemeContextValue = {
  theme: ThemeName;
  setTheme: (t: ThemeName) => void;
  themes: ThemeName[];
  label: Record<ThemeName, string>;
};

const ThemeCtx = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeName>("light");
  const transitionTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Deliberately deferred to an effect (not a lazy useState initializer): the server
  // always renders "light" since it has no access to localStorage/data-theme, so syncing
  // here — after hydration matches that same default — avoids a hydration text mismatch.
  // The actual page colors are already correct pre-hydration via the blocking inline
  // script in app/layout.tsx; only this label/highlight state needs the one-time catch-up.
  useEffect(() => {
    const current = document.documentElement.getAttribute("data-theme") as ThemeName | null;
    if (current && THEME_NAMES.includes(current) && current !== "light") {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time post-hydration sync, see comment above
      setThemeState(current);
    }
  }, []);

  const setTheme = useCallback((t: ThemeName) => {
    setThemeState(t);
    document.documentElement.setAttribute("data-theme", t);
    try {
      localStorage.setItem("cc-theme", t);
    } catch {}
    const root = document.getElementById("root-theming");
    if (root) {
      root.classList.add("theming");
      if (transitionTimeout.current) clearTimeout(transitionTimeout.current);
      transitionTimeout.current = setTimeout(() => root.classList.remove("theming"), 620);
    }
  }, []);

  return <ThemeCtx.Provider value={{ theme, setTheme, themes: THEME_NAMES, label: THEME_LABEL }}>{children}</ThemeCtx.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeCtx);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
