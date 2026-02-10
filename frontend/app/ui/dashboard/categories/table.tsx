import { fetchFilteredCategories } from "@/app/lib/data";

export default async function CategoriesTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const categories = await fetchFilteredCategories(query, currentPage);

  return (
    <>
      <section>
        <table className="bg-stone-100 dark:text-slate-50 dark:bg-slate-800 min-w-full rounded-xl">
          <thead className="rounded-lg">
            <tr className="border-stone-300 border-b dark:border-slate-900">
              <th scope="col" className="px-2 py-3 font-semibold">
                Cod. Categoría
              </th>
              <th scope="col" className="p-3 font-semibold">
                Nombre
              </th>
            </tr>
          </thead>
          <tbody>
            {categories?.map((category) => {

              return (
                <tr key={category.id}>
                  <td className="px-2 py-3 text-center">
                    {category.id}
                  </td>
                  <td className="p-3">
                    {category.name.toLocaleUpperCase()}
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
