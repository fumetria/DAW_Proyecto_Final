"use client";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
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
      <button
        onClick={toggleTheme}
        className="bg-stone-400 text-stone-100 dark:text-slate-950 dark:bg-slate-800 p-1 rounded"
        aria-label="Toggle theme"
      >
        <FontAwesomeIcon icon={isDark ? faMoon : faSun} />
      </button>
    </>
  );
};

export default SetTheme;
