"use client";

import {
  faEye,
  faPencil,
  faUserPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ConfirmModal from "@/app/ui/components/ConfirmModal";
import { deleteUser } from "@/app/lib/actions";

export function ViewUser({
  id,
  onOpen,
}: {
  id: string;
  onOpen: (id: string) => void;
}) {
  return (
    <button
      type="button"
      title="Ver usuario"
      onClick={() => onOpen(id)}
      className="rounded-md dark:border p-1 md:p-2 bg-stone-500 text-stone-100 hover:bg-stone-400 dark:bg-slate-600 dark:hover:bg-cyan-400 dark:hover:text-slate-50 dark:border-slate-500"
    >
      <FontAwesomeIcon icon={faEye} />
    </button>
  );
}

export function UpdateUser({
  id,
  onOpen,
}: {
  id: string;
  onOpen: (id: string) => void;
}) {
  return (
    <button
      type="button"
      title="Editar usuario"
      onClick={() => onOpen(id)}
      className="rounded-md dark:border p-1 md:p-2 bg-blue-600 text-stone-100 hover:bg-blue-200 hover:text-blue-600 dark:bg-slate-600 dark:hover:bg-cyan-400 dark:hover:text-slate-50 dark:border-slate-500"
    >
      <FontAwesomeIcon icon={faPencil} />
    </button>
  );
}

export function DeleteUser({ id }: { id: string }) {
  return (
    <ConfirmModal
      title="Eliminar usuario"
      danger
      confirmText="Eliminar"
      onConfirm={() => deleteUser(id)}
      trigger={
        <button
          type="button"
          className="rounded-md p-1 md:p-2 bg-red-500 text-white hover:bg-red-400"
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>
      }
    />
  );
}

interface CreateUserButtonProps {
  onOpen: () => void;
}

export function CreateUserButton({ onOpen }: CreateUserButtonProps) {
  return (
    <button
      type="button"
      onClick={onOpen}
      title="Nuevo usuario"
      className="flex items-center gap-2 py-2 px-3 rounded-xl bg-blue-500 text-stone-100 border border-blue-500 hover:bg-blue-200 hover:border-blue-500 hover:text-blue-500 dark:bg-cyan-500 dark:text-slate-50 dark:border-cyan-500 dark:hover:bg-cyan-200 dark:hover:text-cyan-500 dark:hover:border-cyan-500"
    >
      <span className="hidden md:block">Nuevo usuario</span>
      <FontAwesomeIcon icon={faUserPlus} />
    </button>
  );
}
