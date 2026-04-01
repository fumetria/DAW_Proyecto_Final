import { fetchArticlesCategories, fetchTaxes } from "@/app/lib/data";
import CreateArticleForm from "@/app/ui/dashboard/articles/createForm";
import { robotoFlex } from "@/app/fonts";

export default async function Page() {
  const [categories, taxes] = await Promise.all([
    fetchArticlesCategories(),
    fetchTaxes(),
  ]);
  return (
    <main>
      <div className="mb-5">
        <h1
          className={`${robotoFlex.className} text-2xl 2xl:text-4xl font-semibold dark:text-slate-50`}
        >
          Nuevo Artículo
        </h1>
      </div>
      <CreateArticleForm categories={categories} taxesList={taxes} />
    </main>
  );
}
