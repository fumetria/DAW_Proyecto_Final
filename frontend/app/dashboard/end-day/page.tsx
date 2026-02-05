import CategoriesTable from "@/app/ui/dashboard/categories/table";
import { Metadata } from "next";
import Search from "@/app/ui/search";

export const metadata: Metadata = {
  title: "Dashboard Cierre de Caja",
};

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;

  return (
    <>
      <section className="w-full">
        <div className="mb-5">
          <h1 className="text-2xl 2xl:text-4xl font-semibold dark:text-slate-50">
            Cierre de caja{" "}
          </h1>
        </div>
        <div className="mb-6 flex gap-1 xl:gap-3">
          <Search placeholder="Introduce palabra a buscar" />
        </div>
      </section>
    </>
  );
}
