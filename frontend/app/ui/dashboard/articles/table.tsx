import { fetchArticles } from "@/app/lib/data";
import { UpdateArticle } from "./buttons";
export default async function ArticlesTable() {
  const articles = await fetchArticles();

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
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {articles?.map((article) => {
              const price = article.pvp
                .toPrecision(3)
                .toString()
                .replace(".", ",");
              return (
                <tr
                  key={article.id}
                  className="border-b border-stone-300 last:border-none  dark:border-slate-900 hover:dark:bg-cyan-600 dark:hover:font-semibold"
                >
                  <td className="px-2 py-3 text-center">{article.cod_art}</td>
                  <td className="p-3">{article.name}</td>
                  <td className="p-3 text-center uppercase">
                    {article.category.name}
                  </td>
                  <td className="p-3 text-center">{price}€</td>
                  <td className="p-3 text-center items-center">
                    <UpdateArticle id={article.id} />
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
