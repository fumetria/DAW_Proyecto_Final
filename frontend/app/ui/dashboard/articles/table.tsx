import { fetchFilteredArticles } from "@/app/lib/data";
import { UpdateArticle, DeleteArticle } from "./buttons";
import IsActiveArticle from "./components/active-button";
export default async function ArticlesTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const articles = await fetchFilteredArticles(query, currentPage);

  return (
    <>
      <section>
        <table className="bg-stone-100 dark:text-slate-50 dark:bg-slate-800 min-w-full rounded-xl">
          <thead className="rounded-lg">
            <tr className="border-stone-300 border-b dark:border-slate-900">
              <th scope="col" className="px-2 py-3 font-semibold">
                Cod. Artículo
              </th>
              <th scope="col" className="p-3 font-semibold">
                Nombre
              </th>
              <th scope="col" className="p-3 font-semibold">
                Categoria
              </th>
              <th scope="col" className="p-3 font-semibold">
                Precio
              </th>
              <th scope="col" className="p-3 font-semibold">
                Activo
              </th>
              <th scope="col" className="p-3 font-semibold">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {articles?.map((article) => {
              const price = article.articlePvp
                .toPrecision(3)
                .toString()
                .replace(".", ",");
              return (
                <tr
                  key={article.articleID}
                  className="border-b border-stone-300 last:border-none  dark:border-slate-900 hover:dark:bg-cyan-600 dark:hover:font-semibold"
                >
                  <td className="px-2 py-3 text-center">
                    {article.articleCOD}
                  </td>
                  <td className="p-3">
                    {article.articleName.toLocaleUpperCase()}
                  </td>
                  <td className="p-3 text-center uppercase">
                    {article.articleCategory}
                  </td>
                  <td className="p-3 text-center">{price}€</td>
                  <td className="p-3 text-center">
                    <IsActiveArticle article={article} />
                  </td>
                  <td className="p-3 flex justify-center gap-2 text-center items-center">
                    <UpdateArticle id={article.articleID} />
                    <DeleteArticle id={article.articleID} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
    </>
  );
}
