import { Metadata } from "next";
import Search from "@/app/ui/search";
import ReceiptsTable from "@/app/ui/dashboard/receipts/table";
import { getReceipts } from "@/app/lib/receipts.action";
import { robotoFlex } from "@/app/fonts";

export const metadata: Metadata = {
  title: "Dashboard Tickets",
};

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const receipts = await getReceipts(query);

  return (
    <>
      <section className="w-full">
        <div className="mb-5">
          <h1 className={`${robotoFlex.className} text-2xl 2xl:text-4xl font-semibold text-stone-500 dark:text-slate-50`}>
            Tickets
          </h1>
        </div>
        <div className="mb-6 flex gap-1 xl:gap-3">
          <Search placeholder="Introduce palabra a buscar" />
        </div>
        <ReceiptsTable receipts={receipts} />
      </section>
    </>
  );
}
