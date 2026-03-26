import type { paymentMethod } from "@/app/lib/types/types";
import { DeletePaymentMethod } from "./buttons";
import { UpdatePaymentMethodAction } from "./PaymentMethodAction";

function formatDateES(dateStr: string | null): string {
  if (!dateStr) return "—";
  const d = new Date(dateStr);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
}

export default async function PaymentMethodsTable({
  paymentMethods = [],
}: {
  paymentMethods: paymentMethod[];
}) {
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
              <th>Fecha creación</th>
              <th>Última modificación</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {paymentMethods?.map((paymentMethod) => {
              return (
                <tr key={paymentMethod.id}>
                  <td className="p-3 text-center">{paymentMethod.id}</td>
                  <td className="p-3">
                    {paymentMethod.name.toLocaleUpperCase()}
                  </td>
                  <td className="p-3 text-center">
                    {paymentMethod.created_at
                      ? formatDateES(
                          new Date(paymentMethod.created_at).toISOString(),
                        )
                      : "-"}
                  </td>
                  <td className="p-3 text-center">
                    {" "}
                    {paymentMethod.updated_at
                      ? formatDateES(
                          new Date(paymentMethod.updated_at).toISOString(),
                        )
                      : "-"}
                  </td>
                  <td className="py-3 text-center">
                    <div className="flex justify-center gap-2 items-center">
                      <UpdatePaymentMethodAction
                        paymentMethodSelected={paymentMethod}
                      />
                      <DeletePaymentMethod id={paymentMethod.id} />
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
