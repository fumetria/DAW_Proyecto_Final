import type { tax } from "@/app/lib/types/types";
import { DeleteTax } from "./buttons";
import { UpdateTaxAction } from "./TaxAction";

function formatDateES(dateStr: string | null): string {
  if (!dateStr) return "—";
  const d = new Date(dateStr);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
}

export default async function TaxesTable({
  taxes = [],
}: {
  taxes: tax[];
}) {
  return (
    <>
      <section>
        <table className="bg-stone-100 dark:text-slate-50 dark:bg-slate-800 min-w-full rounded-xl">
          <thead className="rounded-lg">
            <tr className="border-stone-300 border-b dark:border-slate-900">
              <th scope="col" className="px-2 py-3 font-semibold">
                Cod. tipo
              </th>
              <th scope="col" className="p-3 font-semibold">
                IVA (%)
              </th>
              <th>Fecha creación</th>
              <th>Última modificación</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {taxes?.map((row) => {
              return (
                <tr key={row.id}>
                  <td className="p-3 text-center">{row.id}</td>
                  <td className="p-3 text-center">{row.value}%</td>
                  <td className="p-3 text-center">
                    {row.created_at
                      ? formatDateES(
                          new Date(row.created_at).toISOString(),
                        )
                      : "-"}
                  </td>
                  <td className="p-3 text-center">
                    {row.updated_at
                      ? formatDateES(
                          new Date(row.updated_at).toISOString(),
                        )
                      : "-"}
                  </td>
                  <td className="py-3 text-center">
                    <div className="flex justify-center gap-2 items-center">
                      <UpdateTaxAction taxSelected={row} />
                      <DeleteTax id={row.id} />
                    </div>
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
