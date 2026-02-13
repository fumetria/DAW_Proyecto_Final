import type { UserRow } from "@/app/lib/types/dashboard-tables";

export default function UsersTable({ users = [] }: { users: UserRow[] }) {
  return (
    <section>
      <table className="bg-stone-100 dark:text-slate-50 dark:bg-slate-800 min-w-full rounded-xl">
        <thead className="rounded-lg">
          <tr className="border-stone-300 border-b dark:border-slate-900">
            <th scope="col" className="px-2 py-3 font-semibold">
              Email
            </th>
            <th scope="col" className="p-3 font-semibold">
              Nombre
            </th>
            <th scope="col" className="p-3 font-semibold">
              Apellidos
            </th>
            <th scope="col" className="p-3 font-semibold text-center">
              Empleado
            </th>
            <th scope="col" className="p-3 font-semibold text-center">
              Admin
            </th>
            <th scope="col" className="p-3 font-semibold text-center">
              Activo
            </th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user) => (
            <tr
              key={user.id}
              className="border-b border-stone-300 last:border-none dark:border-slate-900 hover:dark:bg-cyan-600 dark:hover:font-semibold"
            >
              <td className="px-2 py-3">{user.email}</td>
              <td className="p-3">{user.name}</td>
              <td className="p-3">
                {user.surname1}
                {user.surname2 ? ` ${user.surname2}` : ""}
              </td>
              <td className="p-3 text-center">
                {user.is_employee ? "Sí" : "No"}
              </td>
              <td className="p-3 text-center">
                {user.is_admin ? "Sí" : "No"}
              </td>
              <td className="p-3 text-center">
                {user.is_active ? "Sí" : "No"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
