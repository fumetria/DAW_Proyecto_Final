"use client";

import { useActionState, useState } from "react";
import { createPortal } from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { createUser, type UserFormState } from "@/app/lib/actions";

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

interface CreateUserModalProps {
  open: boolean;
  onClose: () => void;
}

export default function CreateUserModal({ open, onClose }: CreateUserModalProps) {
  const [state, formAction] = useActionState<UserFormState | null, FormData>(
    createUser,
    null
  );
  const [showPassword, setShowPassword] = useState(false);

  function handleGeneratePassword() {
    const input = document.getElementById("new-user-password") as HTMLInputElement;
    if (input) {
      input.value = generateRandomPassword(10);
    }
  }

  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-md rounded-xl bg-white shadow-xl dark:bg-slate-800 dark:text-slate-50">
        <div className="flex justify-between items-center bg-stone-700 dark:bg-slate-700 text-stone-100 dark:text-slate-50 px-4 py-3 rounded-t-xl">
          <h3 className="font-semibold text-lg">Nuevo usuario</h3>
          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer hover:font-bold text-xl leading-none"
          >
            ✕
          </button>
        </div>

        <form action={formAction} className="p-4 space-y-4 dark:bg-slate-800">
          {state?.message && (
            <p className="text-sm text-red-600 dark:text-red-400">{state.message}</p>
          )}

          <div>
            <label htmlFor="new-user-email" className="block text-sm font-medium mb-1">
              Email *
            </label>
            <input
              id="new-user-email"
              name="email"
              type="email"
              required
              className="w-full rounded-lg border border-stone-300 dark:border-slate-600 bg-white dark:bg-slate-700 px-3 py-2 text-sm"
              placeholder="usuario@ejemplo.com"
            />
            {state?.errors?.email && (
              <p className="text-xs text-red-600 dark:text-red-400 mt-1">
                {state.errors.email[0]}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="new-user-password" className="block text-sm font-medium mb-1">
              Contraseña *
            </label>
            <div className="flex gap-2">
              <div className="relative flex-1 flex">
                <input
                  id="new-user-password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  minLength={6}
                  className="w-full rounded-lg border border-stone-300 dark:border-slate-600 bg-white dark:bg-slate-700 px-3 py-2 pr-9 text-sm"
                  placeholder="Mín. 6 caracteres"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded text-stone-500 dark:text-slate-400 hover:bg-stone-200 dark:hover:bg-slate-600"
                  title={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                >
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </button>
              </div>
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
            <label htmlFor="new-user-dni" className="block text-sm font-medium mb-1">
              DNI *
            </label>
            <input
              id="new-user-dni"
              name="dni"
              type="text"
              required
              maxLength={12}
              className="w-full rounded-lg border border-stone-300 dark:border-slate-600 bg-white dark:bg-slate-700 px-3 py-2 text-sm"
              placeholder="12345678A"
            />
            {state?.errors?.dni && (
              <p className="text-xs text-red-600 dark:text-red-400 mt-1">
                {state.errors.dni[0]}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="new-user-name" className="block text-sm font-medium mb-1">
              Nombre *
            </label>
            <input
              id="new-user-name"
              name="name"
              type="text"
              required
              className="w-full rounded-lg border border-stone-300 dark:border-slate-600 bg-white dark:bg-slate-700 px-3 py-2 text-sm"
            />
            {state?.errors?.name && (
              <p className="text-xs text-red-600 dark:text-red-400 mt-1">
                {state.errors.name[0]}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="new-user-surname1" className="block text-sm font-medium mb-1">
              Primer apellido *
            </label>
            <input
              id="new-user-surname1"
              name="surname1"
              type="text"
              required
              className="w-full rounded-lg border border-stone-300 dark:border-slate-600 bg-white dark:bg-slate-700 px-3 py-2 text-sm"
            />
            {state?.errors?.surname1 && (
              <p className="text-xs text-red-600 dark:text-red-400 mt-1">
                {state.errors.surname1[0]}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="new-user-surname2" className="block text-sm font-medium mb-1">
              Segundo apellido
            </label>
            <input
              id="new-user-surname2"
              name="surname2"
              type="text"
              className="w-full rounded-lg border border-stone-300 dark:border-slate-600 bg-white dark:bg-slate-700 px-3 py-2 text-sm"
            />
          </div>

          <div>
            <label htmlFor="new-user-rol" className="block text-sm font-medium mb-1">
              Rol *
            </label>
            <select
              id="new-user-rol"
              name="rol"
              required
              className="w-full rounded-lg border border-stone-300 dark:border-slate-600 bg-white dark:bg-slate-700 px-3 py-2 text-sm"
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

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg px-4 py-2 text-sm bg-stone-300 dark:bg-slate-600 hover:bg-stone-400 dark:hover:bg-slate-500"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="rounded-lg px-4 py-2 text-sm bg-blue-600 text-white hover:bg-blue-500 dark:bg-cyan-600 dark:hover:bg-cyan-500"
            >
              Crear usuario
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
}
