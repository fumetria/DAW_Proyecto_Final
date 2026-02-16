"use client";

import { useState } from "react";
import { ViewUser, UpdateUser, DeleteUser } from "./buttons";
import IsActiveUser from "./components/active-button";
import ViewUserModal from "./ViewUserModal";
import EditUserModal from "./EditUserModal";
import type { UserRow } from "@/app/lib/types/types";

export default function UsersTable({
  users = [],
}: {
  users: UserRow[];
}) {
  const [viewUserId, setViewUserId] = useState<string | null>(null);
  const [editUserId, setEditUserId] = useState<string | null>(null);

  return (
    <>
      {/* mobile table */}
      <section className="md:hidden overflow-x-auto">
        <table className="bg-stone-100 dark:text-slate-50 dark:bg-slate-800 min-w-full rounded-xl">
          <thead className="rounded-lg">
            <tr className="border-stone-300 border-b dark:border-slate-900">
              <th scope="col" className="px-2 py-3 text-center">
                Email
              </th>
              <th scope="col" colSpan={2} className="p-3 text-center">
                Nombre
              </th>
              <th scope="col" className="p-3 text-center">
                Rol
              </th>
              <th scope="col" className="p-3 text-center">
                Activo
              </th>
              <th scope="col" className="p-3 text-center">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user) => (
              <tr
                key={user.id}
                className="border-b border-stone-300 last:border-none dark:border-slate-900 hover:dark:bg-cyan-600 dark:hover:font-semibold"
              >
                <td className="px-2 py-3 text-center text-sm">
                  {user.email}
                </td>
                <td className="py-3 flex flex-col text-sm">
                  <p>{[user.name, user.surname1, user.surname2].filter(Boolean).join(" ")}</p>
                </td>
                <td className="p-3 text-center uppercase"></td>
                <td className="p-3 text-center uppercase text-xs">
                  {user.rol}
                </td>
                <td className="p-3 text-center">
                  <IsActiveUser user={user} />
                </td>
                <td className="py-3 flex justify-center gap-2 items-center">
                  <ViewUser id={user.id} onOpen={setViewUserId} />
                  <UpdateUser id={user.id} onOpen={setEditUserId} />
                  <DeleteUser id={user.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      {/* desktop table */}
      <section className="hidden md:block">
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
                Rol
              </th>
              <th scope="col" className="p-3 font-semibold">
                Activo
              </th>
              <th scope="col" className="p-3 font-semibold">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user) => (
              <tr
                key={user.id}
                className="border-b border-stone-300 last:border-none dark:border-slate-900 hover:dark:bg-cyan-600 dark:hover:font-semibold"
              >
                <td className="px-2 py-3 text-center">
                  {user.email}
                </td>
                <td className="p-3">
                  {[user.name, user.surname1, user.surname2].filter(Boolean).join(" ")}
                </td>
                <td className="p-3 text-center uppercase">
                  {user.rol}
                </td>
                <td className="p-3 text-center">
                  <IsActiveUser user={user} />
                </td>
                <td className="p-3 flex justify-center gap-2 text-center items-center">
                  <ViewUser id={user.id} onOpen={setViewUserId} />
                  <UpdateUser id={user.id} onOpen={setEditUserId} />
                  <DeleteUser id={user.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <ViewUserModal
        userId={viewUserId}
        onClose={() => setViewUserId(null)}
      />
      <EditUserModal
        userId={editUserId}
        onClose={() => setEditUserId(null)}
      />
    </>
  );
}
