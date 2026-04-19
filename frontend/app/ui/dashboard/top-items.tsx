import type { TopItems } from "@/app/lib/types/types";

export default function TopsItems({ topItems }: { topItems: TopItems[] }) {
  return (
    <div className="flex w-full flex-col md:col-span-4">
      <h2 className="mb-4 text-xl md:text-2xl font-semibold text-stone-500 dark:text-slate-50">
        Artículos más vendidos
      </h2>
      <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 p-4 dark:bg-slate-800">
        <table className="bg-white px-6 dark:bg-slate-900 rounded-xl">
          <thead className="bg-slate-700 rounded-xl">
            <tr className="">
              <th className="text-center py-2 dark:text-slate-50">Artículo</th>
              <th className="text-center dark:text-slate-50">Cantidad</th>
            </tr>
          </thead>
          <tbody>
            {topItems.map((item, i) => {
              return (
                <tr
                  key={item.articleCode}
                  className={"border-t border-gray-100 dark:border-gray-700"}
                >
                  <td className="p-4 dark:text-slate-50">
                    {i + 1}
                    {".    "}
                    {item.articleName}
                  </td>
                  <td className="text-center dark:text-slate-50">
                    {item.totalQuantity}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
