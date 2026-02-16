import { fetchUserById } from "@/app/lib/data";
import { robotoFlex } from "@/app/fonts";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function ViewUserPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = await fetchUserById(id);
  if (!user) notFound();

  const fullName = [user.name, user.surname1, user.surname2]
    .filter(Boolean)
    .join(" ");

  return (
    <section className="w-full">
      <div className="mb-5 flex items-center justify-between">
        <h1
          className={`${robotoFlex.className} text-2xl 2xl:text-4xl font-semibold text-stone-500 dark:text-slate-50`}
        >
          Ver usuario
        </h1>
        <Link
          href="/dashboard/maintance/users"
          className="rounded-lg px-3 py-2 text-sm bg-stone-200 dark:bg-slate-600 hover:bg-stone-300 dark:hover:bg-slate-500"
        >
          Volver
        </Link>
      </div>
      <div className="rounded-xl bg-stone-100 dark:bg-slate-800 p-6 max-w-2xl">
        <dl className="grid gap-4 sm:grid-cols-2">
          <div>
            <dt className="text-sm font-medium text-stone-500 dark:text-slate-400">
              Email
            </dt>
            <dd className="mt-1 text-stone-900 dark:text-slate-50">
              {user.email}
            </dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-stone-500 dark:text-slate-400">
              DNI
            </dt>
            <dd className="mt-1 text-stone-900 dark:text-slate-50">
              {user.dni}
            </dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-stone-500 dark:text-slate-400">
              Nombre completo
            </dt>
            <dd className="mt-1 text-stone-900 dark:text-slate-50">
              {fullName}
            </dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-stone-500 dark:text-slate-400">
              Rol
            </dt>
            <dd className="mt-1 text-stone-900 dark:text-slate-50 capitalize">
              {user.rol}
            </dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-stone-500 dark:text-slate-400">
              Estado
            </dt>
            <dd className="mt-1">
              <span
                className={
                  user.is_active
                    ? "text-green-600 dark:text-green-400"
                    : "text-red-600 dark:text-red-400"
                }
              >
                {user.is_active ? "Activo" : "Inactivo"}
              </span>
            </dd>
          </div>
        </dl>
        <div className="mt-6">
          <Link
            href={`/dashboard/maintance/users/${id}/edit`}
            className="rounded-lg px-4 py-2 text-sm bg-blue-600 text-white hover:bg-blue-500 dark:bg-cyan-600 dark:hover:bg-cyan-500"
          >
            Editar usuario
          </Link>
        </div>
      </div>
    </section>
  );
}
