import UsersTable from "@/app/ui/dashboard/users/table";
import { Metadata } from "next";
import { robotoFlex } from "@/app/fonts";
import Search from "@/app/ui/search";
import Pagination from "@/app/ui/components/Pagination";
import { fetchFilteredUsers } from "@/app/lib/data";
import UsersActions from "@/app/ui/dashboard/users/UsersActions";
import { auth } from "@/auth";

export const metadata: Metadata = {
  title: "Dashboard Mantenimiento Usuarios",
};

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query ?? "";
  const currentPage = Number(searchParams?.page) || 1;
  const { users, totalCount } = await fetchFilteredUsers(query, currentPage);
  const session = await auth();
  const userId = session?.user.email;

  return (
    <section className="w-full">
      <div className="mb-5">
        <h1
          className={`${robotoFlex.className} text-2xl 2xl:text-4xl font-semibold text-stone-500 dark:text-slate-50`}
        >
          Mantenimiento usuarios
        </h1>
      </div>
      <div className="mb-6 flex gap-1 xl:gap-3">
        <Search placeholder="Buscar por email, nombre, apellido, DNI o rol" />
        <UsersActions />
      </div>
      <UsersTable users={users} userId={userId ?? ""} />
      <Pagination totalCount={totalCount} currentPage={currentPage} />
    </section>
  );
}
