"use client";

import { useTheme } from "./ThemeContext";
import type { ThemeName } from "@/lib/m3-theme";

const SWATCH: Record<ThemeName, string> = {
  light: "linear-gradient(135deg,#FFFFFF 0 50%,#0073EA 50% 100%)",
  cloud: "linear-gradient(135deg,#E8EBF5 0 50%,#00C875 50% 100%)",
  bold: "linear-gradient(135deg,#EAE7FD 0 50%,#6C6CFF 50% 100%)",
  dark: "linear-gradient(135deg,#14182B 0 50%,#FDAB3D 50% 100%)",
};

export function ThemeDock() {
  const { theme, setTheme, themes, label } = useTheme();

  return (
    <div className="fixed z-[88] bottom-5 right-5 flex items-center gap-3.5 px-4 py-2.5 rounded-full bg-surface-container border border-outline elevation-3">
      <div className="flex flex-col leading-tight">
        <span className="text-label-m text-on-surface-variant">Theme</span>
        <span className="text-title-s text-on-surface">{label[theme]}</span>
      </div>
      <div className="flex gap-2">
        {themes.map((t) => {
          const on = t === theme;
          return (
            <button
              key={t}
              type="button"
              aria-label={`${label[t]} theme`}
              onClick={() => setTheme(t)}
              className="w-7 h-7 rounded-full border-none cursor-pointer transition-transform duration-300"
              style={{
                background: SWATCH[t],
                transform: on ? "scale(1.18)" : "scale(1)",
                boxShadow: on ? "0 0 0 2px var(--color-surface-container), 0 0 0 4px var(--color-primary)" : "none",
                opacity: on ? 1 : 0.6,
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
