import { faArrowsRotate } from "@fortawesome/free-solid-svg-icons";
import clsx from "clsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReceipt } from "@fortawesome/free-solid-svg-icons";
import { ReceiptViewRow } from "@/app/lib/receipts.action";
import Link from "next/link";

export default async function RecentTickets({
  latestReceipts,
}: {
  latestReceipts: ReceiptViewRow[];
}) {
  return (
    <div className="flex w-full flex-col md:col-span-4">
      <h2 className="mb-4 text-xl md:text-2xl font-semibold text-stone-500 dark:text-slate-50">
        Últimos tickets
      </h2>
      <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 p-4 dark:bg-slate-800">
        <div className="bg-white px-6 dark:bg-slate-900 rounded-md">
          {latestReceipts.map((receipt, i) => {
            return (
              <Link
                href={`http://localhost:3000/dashboard/receipts?page=1&query=${receipt.num_receipt}`}
                key={receipt.id}
                className={clsx(
                  "flex flex-row items-center justify-between py-4",
                  {
                    "border-t border-gray-100 dark:border-gray-700": i !== 0,
                  },
                )}
              >
                <div className="flex items-center">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 dark:bg-slate-700">
                      <FontAwesomeIcon
                        icon={faReceipt}
                        className="h-4 w-4 text-gray-500 dark:text-gray-300"
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold md:text-base text-stone-900 dark:text-slate-100">
                        {receipt.num_receipt}
                      </p>
                      <p className="hidden text-sm text-gray-500 dark:text-gray-400 sm:block">
                        {receipt.payment_method || "Sin datos"}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <p className="truncate text-sm font-medium md:text-base text-stone-900 dark:text-slate-100">
                    {receipt.total.toFixed(2)}€
                  </p>
                  <p className="text-xs text-gray-400 dark:text-gray-500">
                    {receipt.created_at
                      ? new Date(receipt.created_at).toLocaleDateString()
                      : "-"}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
        <div className="flex items-center pb-2 pt-6">
          <FontAwesomeIcon
            icon={faArrowsRotate}
            className="h-5 w-5 text-gray-500 dark:text-gray-400"
          />
          <h3 className="ml-2 text-sm text-gray-500 dark:text-gray-400 ">
            Actualizado ahora
          </h3>
        </div>
      </div>
    </div>
  );
}
