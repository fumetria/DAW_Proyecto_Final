import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard home",
};

export default function Page() {
  return (
    <h1 className="text-stone-950 dark:text-slate-50">Dasboard home page</h1>
  );
}
