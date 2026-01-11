import { fetchArticles } from "@/app/lib/data";

export default async function ArticlesTable() {
  const articles = await fetchArticles();

  return (
    <>
      <section>
        <table className="dark:text-slate-50 dark:bg-slate-800 min-w-full rounded-xl">
          <thead className="rounded-lg">
            <tr className="border-b dark:border-slate-900">
              <th scope="col" className="p-3 font-semibold">
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
                  className="border-b dark:border-slate-900 hover:dark:bg-cyan-600 hover:font-semibold"
                >
                  <td className="p-3 text-center">{article.cod_art}</td>
                  <td className="p-3">{article.name}</td>
                  <td className="p-3 text-center uppercase">
                    {article.category.name}
                  </td>
                  <td className="p-3 text-center">{price}€</td>
                  <td></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
    </>
  );
}
