"use client";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon, faComputer } from "@fortawesome/free-solid-svg-icons";
import clsx from "clsx";
//https://github.com/vercel/next.js/discussions/53063
//https://github.com/Hugomndez/nextjs-app-darkmode/tree/main
const SetTheme = () => {
  const [theme, setTheme] = useState(global.window?.__theme || "light");

  const isDark = theme === "dark";

  const toggleTheme = () => {
    global.window?.__setPreferredTheme(theme === "light" ? "dark" : "light");
  };

  const toggleDark = () => {
    global.window?.__setPreferredTheme("dark");
  };

  useEffect(() => {
    global.window.__onThemeChange = setTheme;
  }, []);

  return (
    <>
      <div className="flex gap-1 bg-stone-300 dark:bg-slate-800 rounded-4xl p-1">
        {/* <button
          onClick={toggleTheme}
          className={clsx(
            "text-stone-950 dark:text-slate-50 p-1 rounded-full",
            theme === "system" ? "bg-stone-100 dark:bg-slate-700" : "bg-none"
          )}
          aria-label="Toggle theme"
        >
          <FontAwesomeIcon icon={faComputer} />
        </button> */}
        <button
          onClick={toggleTheme}
          className={clsx(
            "text-stone-950 dark:text-slate-50 p-1 rounded-full",
            isDark ? "bg-stone-100 dark:bg-slate-700" : "bg-none"
          )}
          aria-label="Toggle theme"
        >
          <FontAwesomeIcon icon={faMoon} />
        </button>
        <button
          onClick={toggleTheme}
          className={clsx(
            "text-stone-950 dark:text-slate-50 p-1 rounded-full",
            theme === "light" ? "bg-stone-100 dark:bg-slate-700" : "bg-none"
          )}
          aria-label="Toggle theme"
        >
          <FontAwesomeIcon icon={faSun} />
        </button>
      </div>
      {/* <button
        onClick={toggleTheme}
        className="bg-stone-400 text-stone-100 dark:text-slate-950 dark:bg-slate-800 p-1 rounded"
        aria-label="Toggle theme"
      >
        <FontAwesomeIcon icon={isDark ? faMoon : faSun} />
      </button> */}
    </>
  );
};

export default SetTheme;
