import PaymentMethodsTable from "@/app/ui/dashboard/payment-methods/table";
import { Metadata } from "next";
import { robotoFlex } from "@/app/fonts";
import Search from "@/app/ui/search";
import { CreatePaymentMethodAction } from "@/app/ui/dashboard/payment-methods/PaymentMethodAction";
import Pagination from "@/app/ui/components/Pagination";
import { fetchFilteredPaymentMethods } from "@/app/lib/data";

export const metadata: Metadata = {
  title: "Dashboard - Maintance payment methods ",
};

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const { paymentMethods, totalCount } = await fetchFilteredPaymentMethods(
    query,
    currentPage,
  );
  return (
    <>
      <section className="w-full">
        <div className="mb-5">
          <h1
            className={`${robotoFlex.className} text-2xl 2xl:text-4xl font-semibold text-stone-500 dark:text-slate-50`}
          >
            Mantenimiento artículos
          </h1>
        </div>
        <div className="mb-6 flex gap-1 xl:gap-3">
          <Search placeholder="Introduce palabra a buscar" />
          <CreatePaymentMethodAction />
        </div>
        <PaymentMethodsTable paymentMethods={paymentMethods} />
        <Pagination totalCount={totalCount} currentPage={currentPage} />
      </section>
    </>
  );
}
