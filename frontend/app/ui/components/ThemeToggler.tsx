"use client";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import clsx from "clsx";
//https://github.com/vercel/next.js/discussions/53063
//https://github.com/Hugomndez/nextjs-app-darkmode/tree/main
const SetTheme = () => {
  const [theme, setTheme] = useState(global.window?.__theme || "light");

  const isDark = theme === "dark";

  const toggleTheme = () => {
    global.window?.__setPreferredTheme(theme === "light" ? "dark" : "light");
  };

  useEffect(() => {
    global.window.__onThemeChange = setTheme;
  }, []);

  return (
    <>
      <div className="flex gap-1 bg-stone-100 dark:bg-slate-800 rounded-2xl">
        <button
          onClick={toggleTheme}
          className={clsx(
            "text-stone-300 dark:text-slate-50 p-1 rounded-full",
            isDark ? "bg-stone-100 dark:bg-slate-700" : "bg-none"
          )}
          aria-label="Toggle theme"
        >
          <FontAwesomeIcon icon={faMoon} size="sm" />
        </button>
        <button
          onClick={toggleTheme}
          className={clsx(
            "text-stone-100 dark:text-slate-50 rounded-full",
            theme === "light" ? "bg-stone-300 dark:bg-slate-700" : "bg-none"
          )}
          aria-label="Toggle theme"
        >
          <FontAwesomeIcon icon={faSun} size="sm" />
        </button>
      </div>
    </>
  );
};

export default SetTheme;
