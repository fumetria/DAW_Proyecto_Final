"use client";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import clsx from "clsx";
//https://github.com/vercel/next.js/discussions/53063
//https://github.com/Hugomndez/nextjs-app-darkmode/tree/main
type Theme = "light" | "dark";

export default function ThemeToggler() {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === "undefined") return "light";
    const datasetTheme = document.documentElement.dataset.theme as Theme | undefined;
    return window.__theme ?? datasetTheme ?? "light";
  });

  const isDark = theme === "dark";

  const setPreferredTheme = (newTheme: Theme) => {
    if (typeof window === "undefined") return;
    window.__setPreferredTheme(newTheme);
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    const prev = window.__onThemeChange;
    window.__onThemeChange = (nextTheme) => {
      prev?.(nextTheme);
      setTheme(nextTheme);
    };
    return () => {
      window.__onThemeChange = prev;
    };
  }, []);

  return (
    <div
      role="radiogroup"
      aria-label="Theme"
      className={clsx(
        "relative inline-flex items-center rounded-full p-1 select-none",
        "bg-stone-100 dark:bg-slate-900/70 backdrop-blur",
        "ring-1 ring-inset ring-stone-300/90 dark:ring-slate-700/60",
        "shadow-[0_1px_0_rgba(255,255,255,0.9),0_10px_30px_rgba(15,23,42,0.08)] dark:shadow-[0_1px_0_rgba(255,255,255,0.06),0_10px_30px_rgba(2,6,23,0.45)]"
      )}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") setPreferredTheme("light");
        if (e.key === "ArrowRight") setPreferredTheme("dark");
      }}
    >
      {/* Sliding indicator */}
      <span
        aria-hidden="true"
        className={clsx(
          "pointer-events-none absolute left-1 top-1 h-9 w-9 rounded-full",
          "bg-white dark:bg-slate-800",
          "ring-1 ring-inset ring-stone-300/90 dark:ring-slate-700/70",
          "shadow-[0_10px_25px_rgba(15,23,42,0.12)] dark:shadow-[0_10px_25px_rgba(0,0,0,0.45)]",
          "transition-transform duration-300 ease-out motion-reduce:transition-none",
          isDark ? "translate-x-9" : "translate-x-0"
        )}
      />

      <button
        type="button"
        role="radio"
        aria-checked={!isDark}
        aria-label="Light theme"
        onClick={() => setPreferredTheme("light")}
        className={clsx(
          "relative z-10 grid h-9 w-9 place-items-center rounded-full",
          "transition-colors duration-200 motion-reduce:transition-none",
          !isDark
            ? "text-stone-950"
            : "text-stone-700 hover:text-stone-950 dark:text-slate-400 dark:hover:text-slate-100",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/70 focus-visible:ring-offset-2 focus-visible:ring-offset-stone-100 dark:focus-visible:ring-offset-slate-950"
        )}
      >
        <FontAwesomeIcon
          icon={faSun}
          size="sm"
          className={clsx(
            "transition-transform duration-200 motion-reduce:transition-none",
            !isDark ? "scale-100" : "scale-95"
          )}
        />
      </button>

      <button
        type="button"
        role="radio"
        aria-checked={isDark}
        aria-label="Dark theme"
        onClick={() => setPreferredTheme("dark")}
        className={clsx(
          "relative z-10 grid h-9 w-9 place-items-center rounded-full",
          "transition-colors duration-200 motion-reduce:transition-none",
          isDark
            ? "text-slate-50"
            : "text-stone-700 hover:text-stone-950 dark:text-slate-400 dark:hover:text-slate-100",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/70 focus-visible:ring-offset-2 focus-visible:ring-offset-stone-100 dark:focus-visible:ring-offset-slate-950"
        )}
      >
        <FontAwesomeIcon
          icon={faMoon}
          size="sm"
          className={clsx(
            "transition-transform duration-200 motion-reduce:transition-none",
            isDark ? "scale-100" : "scale-95"
          )}
        />
      </button>
    </div>
  );
}
