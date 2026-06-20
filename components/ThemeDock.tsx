"use client";

import { useEffect } from "react";
import { IconSymbol } from "./IconSymbol";
import { useTheme } from "./ThemeContext";

export function ThemeDock() {
  const { theme, setTheme, label } = useTheme();
  const items = [
    { key: "light" as const, icon: "light_mode" },
    { key: "dark" as const, icon: "dark_mode" },
  ];

  useEffect(() => {
    const buttons = Array.from(document.querySelectorAll<HTMLButtonElement>("[data-theme-btn]"));
    const listeners = buttons.map((button) => {
      const handler = () => {
        const next = button.dataset.themeBtn;
        if (next === "light" || next === "dark") setTheme(next);
      };
      button.addEventListener("click", handler);
      button.addEventListener("pointerdown", handler);
      return [button, handler] as const;
    });
    return () => {
      listeners.forEach(([button, handler]) => {
        button.removeEventListener("click", handler);
        button.removeEventListener("pointerdown", handler);
      });
    };
  }, [setTheme]);

  return (
    <div className="hig-glass fixed bottom-4 right-4 z-[88] flex items-center gap-2 rounded-full p-2 sm:bottom-5 sm:right-5 sm:gap-3 sm:rounded-[28px] sm:px-3.5 sm:py-2">
      <div className="hidden min-w-14 flex-col leading-tight sm:flex">
        <span className="text-label-s text-on-surface-variant">Theme</span>
        <span data-theme-name className="text-title-s text-on-surface">{label[theme]}</span>
      </div>
      <div role="group" aria-label="Theme" className="flex gap-1 rounded-full border border-outline-variant/60 bg-surface-container/44 p-1">
        {items.map((item) => {
          const on = item.key === theme;
          return (
            <button
              key={item.key}
              type="button"
              data-theme-btn={item.key}
              aria-label={`${label[item.key]} theme`}
              aria-pressed={on}
              onClick={() => setTheme(item.key)}
              onPointerDown={() => setTheme(item.key)}
              className={`hig-control state-layer grid h-10 w-10 place-items-center rounded-full transition-colors ${
                on ? "border-primary bg-primary text-on-primary" : "border-transparent bg-transparent text-on-surface-variant"
              }`}
            >
              <IconSymbol name={item.icon} size={20} filled={on} />
            </button>
          );
        })}
      </div>
    </div>
  );
}
