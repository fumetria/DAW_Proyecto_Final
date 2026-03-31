import { robotoFlex } from "@/app/fonts";
import UpdateArticleForm from "@/app/ui/dashboard/articles/editForm";
import {
  fetchArticleById,
  fetchArticlesCategories,
  fetchTaxes,
} from "@/app/lib/data";
import { notFound } from "next/navigation";

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  const [article, categories, taxes] = await Promise.all([
    fetchArticleById(id),
    fetchArticlesCategories(),
    fetchTaxes(),
  ]);
  if (!article) {
    notFound();
  }
  return (
    <main>
      <div className="mb-5">
        <h1
          className={`${robotoFlex.className} text-2xl 2xl:text-4xl font-semibold dark:text-slate-50`}
        >
          Editar artículo
        </h1>
      </div>
      <UpdateArticleForm
        articleSelected={article}
        categoryList={categories}
        taxesList={taxes}
      />
    </main>
  );
}
