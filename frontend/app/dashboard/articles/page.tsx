import ArticlesTable from "@/app/ui/dashboard/articles/table";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard Articles",
};

export default function Page() {
  return (
    <>
      <section className="w-full">
        <div className="mb-5">
          <h1 className="text-2xl 2xl:text-4xl font-semibold dark:text-slate-50">
            Mantenimiento artículos
          </h1>
        </div>
        <ArticlesTable />
      </section>
    </>
  );
}
