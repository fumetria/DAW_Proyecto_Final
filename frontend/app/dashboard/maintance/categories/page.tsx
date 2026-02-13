import CategoriesTable from "@/app/ui/dashboard/categories/table";
import { Metadata } from "next";
import Search from "@/app/ui/search";
import { robotoFlex } from "@/app/fonts";
import { fetchFilteredCategories } from "@/app/lib/data";
import Pagination from "@/app/ui/components/Pagination";

export const metadata: Metadata = {
  title: "Dashboard Mantenimiento Categorías",
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
  const { categories, totalCount } = await fetchFilteredCategories(
    query,
    currentPage,
  );

  return (
    <>
      <section className="w-full">
        <div className="mb-5">
          <h1
            className={`${robotoFlex.className} text-2xl 2xl:text-4xl font-semibold text-stone-500 dark:text-slate-50`}
          >
            Mantenimiento categorías
          </h1>
        </div>
        <div className="mb-6 flex gap-1 xl:gap-3">
          <Search placeholder="Introduce palabra a buscar" />
        </div>
        <CategoriesTable categories={categories} />
        <Pagination totalCount={totalCount} currentPage={currentPage} />
      </section>
    </>
  );
}
