import { Metadata } from "next";
import { robotoFlex } from "@/app/fonts";
import Pagination from "@/app/ui/components/Pagination";
import UsersTable from "@/app/ui/dashboard/users/table";
import { fetchFilteredUsers } from "@/app/lib/data";

export const metadata: Metadata = {
  title: "Dashboard Mantenimiento Usuarios",
};

export default async function Page(props: {
  searchParams?: Promise<{ page?: string }>;
}) {
  const searchParams = await props.searchParams;
  const currentPage = Number(searchParams?.page) || 1;
  const { users, totalCount } = await fetchFilteredUsers(currentPage);

  return (
    <>
      <section className="w-full">
        <div className="mb-5">
          <h1 className={`${robotoFlex.className} text-2xl 2xl:text-4xl font-semibold text-stone-500 dark:text-slate-50`}>
            Mantenimiento usuarios
          </h1>
        </div>
        <UsersTable users={users} />
        <Pagination totalCount={totalCount} currentPage={currentPage} />
      </section>
    </>
  );
}
