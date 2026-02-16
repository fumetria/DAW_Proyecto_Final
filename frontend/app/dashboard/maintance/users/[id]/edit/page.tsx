import { fetchUserById } from "@/app/lib/data";
import { robotoFlex } from "@/app/fonts";
import EditUserForm from "@/app/ui/dashboard/users/EditUserForm";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function EditUserPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = await fetchUserById(id);
  if (!user) notFound();

  return (
    <section className="w-full">
      <div className="mb-5 flex items-center justify-between">
        <h1
          className={`${robotoFlex.className} text-2xl 2xl:text-4xl font-semibold text-stone-500 dark:text-slate-50`}
        >
          Editar usuario
        </h1>
        <Link
          href={`/dashboard/maintance/users/${id}`}
          className="rounded-lg px-3 py-2 text-sm bg-stone-200 dark:bg-slate-600 hover:bg-stone-300 dark:hover:bg-slate-500"
        >
          Volver
        </Link>
      </div>
      <div className="rounded-xl bg-stone-100 dark:bg-slate-800 p-6">
        <EditUserForm user={user} id={id} />
      </div>
    </section>
  );
}
