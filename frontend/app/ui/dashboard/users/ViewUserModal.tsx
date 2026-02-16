"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { getUserId, type UserSafe } from "@/app/lib/actions";

interface ViewUserModalProps {
  userId: string | null;
  onClose: () => void;
}

export default function ViewUserModal({ userId, onClose }: ViewUserModalProps) {
  const [user, setUser] = useState<UserSafe | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!userId) {
      setUser(null);
      return;
    }
    setLoading(true);
    getUserId(userId).then((data) => {
      setUser(data);
      setLoading(false);
    });
  }, [userId]);

  if (!userId) return null;

  const fullName = user
    ? [user.name, user.surname1, user.surname2].filter(Boolean).join(" ")
    : "";

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-md rounded-xl bg-white shadow-xl dark:bg-slate-800 dark:text-slate-50">
        <div className="flex justify-between items-center bg-stone-700 dark:bg-slate-700 text-stone-100 dark:text-slate-50 px-4 py-3 rounded-t-xl">
          <h3 className="font-semibold text-lg">Ver usuario</h3>
          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer hover:font-bold text-xl leading-none"
          >
            ✕
          </button>
        </div>
        <div className="p-4 dark:bg-slate-800">
          {loading ? (
            <p className="text-sm text-stone-500 dark:text-slate-400">Cargando...</p>
          ) : user ? (
            <dl className="grid gap-3">
              <div>
                <dt className="text-sm font-medium text-stone-500 dark:text-slate-400">Email</dt>
                <dd className="mt-0.5 text-stone-900 dark:text-slate-50">{user.email}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-stone-500 dark:text-slate-400">DNI</dt>
                <dd className="mt-0.5 text-stone-900 dark:text-slate-50">{user.dni}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-stone-500 dark:text-slate-400">Nombre completo</dt>
                <dd className="mt-0.5 text-stone-900 dark:text-slate-50">{fullName}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-stone-500 dark:text-slate-400">Rol</dt>
                <dd className="mt-0.5 text-stone-900 dark:text-slate-50 capitalize">{user.rol}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-stone-500 dark:text-slate-400">Estado</dt>
                <dd className="mt-0.5">
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
          ) : (
            <p className="text-sm text-red-600 dark:text-red-400">No se pudo cargar el usuario.</p>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}
