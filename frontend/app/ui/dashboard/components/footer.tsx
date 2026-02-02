"use client";
import dynamic from "next/dynamic";

const SetTheme = dynamic(() => import("@/app/ui/components/ThemeToggler"), {
  ssr: false,
});
export default function AppFooter() {
  return (
    <footer className="grid justify-items-center bg-stone-100 dark:bg-slate-800 border-t border-stone-300 dark:border-slate-900 py-0.5">
      <div className="flex gap-2 items-center">
        <SetTheme />
      </div>
    </footer>
  );
}
