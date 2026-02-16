"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { getUserId, type UserSafe } from "@/app/lib/actions";
import EditUserForm from "./EditUserForm";

interface EditUserModalProps {
  userId: string | null;
  onClose: () => void;
}

export default function EditUserModal({ userId, onClose }: EditUserModalProps) {
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

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 overflow-y-auto py-8">
      <div className="w-full max-w-lg rounded-xl bg-white shadow-xl dark:bg-slate-800 dark:text-slate-50 my-auto">
        <div className="flex justify-between items-center bg-stone-700 dark:bg-slate-700 text-stone-100 dark:text-slate-50 px-4 py-3 rounded-t-xl">
          <h3 className="font-semibold text-lg">Editar usuario</h3>
          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer hover:font-bold text-xl leading-none"
          >
            ✕
          </button>
        </div>
        <div className="p-4 dark:bg-slate-800 max-h-[70vh] overflow-y-auto">
          {loading ? (
            <p className="text-sm text-stone-500 dark:text-slate-400">Cargando...</p>
          ) : user ? (
            <EditUserForm user={user} id={userId} onCancel={onClose} />
          ) : (
            <p className="text-sm text-red-600 dark:text-red-400">No se pudo cargar el usuario.</p>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}
