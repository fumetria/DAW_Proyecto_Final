import ArticlesTable from "@/app/ui/dashboard/articles/table";
import { Metadata } from "next";
import { robotoFlex } from "@/app/fonts";
import Search from "@/app/ui/search";
import { CreateArticle } from "@/app/ui/dashboard/articles/buttons";

export const metadata: Metadata = {
  title: "Dashboard Articles",
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
          <h1
            className={`${robotoFlex.className} text-2xl 2xl:text-4xl font-semibold dark:text-slate-50`}
          >
            Mantenimiento artículos
          </h1>
        </div>
        <div className="mb-6 flex gap-1 xl:gap-3">
          <Search placeholder="Introduce palabra a buscar" />
          <CreateArticle />
        </div>
        <ArticlesTable query={query} currentPage={currentPage} />
      </section>
    </>
  );
}
