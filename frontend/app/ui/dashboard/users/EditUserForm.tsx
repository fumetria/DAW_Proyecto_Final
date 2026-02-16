"use client";

import { useActionState } from "react";
import Link from "next/link";
import { updateUser, type UserFormState, type UserSafe } from "@/app/lib/actions";
import type { user } from "@/app/lib/types/types";

const ROLES = [
  { value: "user", label: "Usuario" },
  { value: "admin", label: "Administrador" },
] as const;

function generateRandomPassword(length: number = 10): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export default function EditUserForm({
  user,
  id,
  onCancel,
}: {
  user: UserSafe | user;
  id: string;
  onCancel?: () => void;
}) {
  const [state, formAction] = useActionState<UserFormState | null, FormData>(
    (prev: UserFormState | null, fd: FormData) => updateUser(id, prev, fd),
    null
  );

  function handleGeneratePassword() {
    const input = document.getElementById("edit-user-password") as HTMLInputElement;
    if (input) {
      input.value = generateRandomPassword(10);
      input.type = "text";
      setTimeout(() => {
        input.type = "password";
      }, 2000);
    }
  }

  return (
    <form action={formAction} className="space-y-4 max-w-2xl">
      {state?.message && (
        <p className="text-sm text-red-600 dark:text-red-400">{state.message}</p>
      )}

      <div>
        <label htmlFor="edit-user-email" className="block text-sm font-medium mb-1">
          Email *
        </label>
        <input
          id="edit-user-email"
          name="email"
          type="email"
          required
          defaultValue={user.email}
          className="w-full rounded-lg border border-stone-300 dark:border-slate-600 bg-white dark:bg-slate-700 px-3 py-2 text-sm dark:text-slate-50"
        />
        {state?.errors?.email && (
          <p className="text-xs text-red-600 dark:text-red-400 mt-1">
            {state.errors.email[0]}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="edit-user-password" className="block text-sm font-medium mb-1">
          Nueva contraseña (dejar vacío para no cambiar)
        </label>
        <div className="flex gap-2">
          <input
            id="edit-user-password"
            name="password"
            type="password"
            minLength={6}
            placeholder="Mín. 6 caracteres"
            className="flex-1 rounded-lg border border-stone-300 dark:border-slate-600 bg-white dark:bg-slate-700 px-3 py-2 text-sm dark:text-slate-50"
          />
          <button
            type="button"
            onClick={handleGeneratePassword}
            className="rounded-lg px-3 py-2 text-sm bg-stone-200 dark:bg-slate-600 hover:bg-stone-300 dark:hover:bg-slate-500"
          >
            Generar
          </button>
        </div>
        {state?.errors?.password && (
          <p className="text-xs text-red-600 dark:text-red-400 mt-1">
            {state.errors.password[0]}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="edit-user-dni" className="block text-sm font-medium mb-1">
          DNI *
        </label>
        <input
          id="edit-user-dni"
          name="dni"
          type="text"
          required
          maxLength={12}
          defaultValue={user.dni}
          className="w-full rounded-lg border border-stone-300 dark:border-slate-600 bg-white dark:bg-slate-700 px-3 py-2 text-sm dark:text-slate-50"
        />
        {state?.errors?.dni && (
          <p className="text-xs text-red-600 dark:text-red-400 mt-1">
            {state.errors.dni[0]}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="edit-user-name" className="block text-sm font-medium mb-1">
          Nombre *
        </label>
        <input
          id="edit-user-name"
          name="name"
          type="text"
          required
          defaultValue={user.name}
          className="w-full rounded-lg border border-stone-300 dark:border-slate-600 bg-white dark:bg-slate-700 px-3 py-2 text-sm dark:text-slate-50"
        />
        {state?.errors?.name && (
          <p className="text-xs text-red-600 dark:text-red-400 mt-1">
            {state.errors.name[0]}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="edit-user-surname1" className="block text-sm font-medium mb-1">
          Primer apellido *
        </label>
        <input
          id="edit-user-surname1"
          name="surname1"
          type="text"
          required
          defaultValue={user.surname1}
          className="w-full rounded-lg border border-stone-300 dark:border-slate-600 bg-white dark:bg-slate-700 px-3 py-2 text-sm dark:text-slate-50"
        />
        {state?.errors?.surname1 && (
          <p className="text-xs text-red-600 dark:text-red-400 mt-1">
            {state.errors.surname1[0]}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="edit-user-surname2" className="block text-sm font-medium mb-1">
          Segundo apellido
        </label>
        <input
          id="edit-user-surname2"
          name="surname2"
          type="text"
          defaultValue={user.surname2 ?? ""}
          className="w-full rounded-lg border border-stone-300 dark:border-slate-600 bg-white dark:bg-slate-700 px-3 py-2 text-sm dark:text-slate-50"
        />
      </div>

      <div>
        <label htmlFor="edit-user-rol" className="block text-sm font-medium mb-1">
          Rol *
        </label>
        <select
          id="edit-user-rol"
          name="rol"
          required
          defaultValue={user.rol}
          className="w-full rounded-lg border border-stone-300 dark:border-slate-600 bg-white dark:bg-slate-700 px-3 py-2 text-sm dark:text-slate-50"
        >
          {ROLES.map((r) => (
            <option key={r.value} value={r.value}>
              {r.label}
            </option>
          ))}
        </select>
        {state?.errors?.rol && (
          <p className="text-xs text-red-600 dark:text-red-400 mt-1">
            {state.errors.rol[0]}
          </p>
        )}
      </div>

      <div className="flex gap-2 pt-2">
        {onCancel ? (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg px-4 py-2 text-sm bg-stone-300 dark:bg-slate-600 hover:bg-stone-400 dark:hover:bg-slate-500"
          >
            Cancelar
          </button>
        ) : (
          <Link
            href={`/dashboard/maintance/users/${id}`}
            className="rounded-lg px-4 py-2 text-sm bg-stone-300 dark:bg-slate-600 hover:bg-stone-400 dark:hover:bg-slate-500"
          >
            Cancelar
          </Link>
        )}
        <button
          type="submit"
          className="rounded-lg px-4 py-2 text-sm bg-blue-600 text-white hover:bg-blue-500 dark:bg-cyan-600 dark:hover:bg-cyan-500"
        >
          Guardar cambios
        </button>
      </div>
    </form>
  );
}
