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
    <div className="fixed z-[88] bottom-5 right-5 flex items-center gap-3 px-3.5 py-2 rounded-[28px] bg-surface-container-high border border-outline elevation-3">
      <div className="flex min-w-14 flex-col leading-tight">
        <span className="text-label-s text-on-surface-variant">Theme</span>
        <span data-theme-name className="text-title-s text-on-surface">{label[theme]}</span>
      </div>
      <div role="group" aria-label="Theme" className="flex gap-1 rounded-full bg-surface-container-highest p-1">
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
              className={`state-layer grid h-[38px] w-[38px] place-items-center rounded-full border transition-colors ${
                on ? "border-primary bg-primary text-on-primary elevation-1" : "border-transparent bg-transparent text-on-surface-variant"
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
