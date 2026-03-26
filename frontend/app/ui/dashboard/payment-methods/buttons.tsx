"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import ConfirmModal from "../../components/ConfirmModal";
import { deletePaymentMethod } from "@/app/lib/actions";

interface ModalButtonProps {
  onOpen: () => void;
}

export function CreatePaymentMethod({ onOpen }: ModalButtonProps) {
  return (
    <button
      type="button"
      title="Nuevo método de pago"
      onClick={onOpen}
      className="flex items-center gap-2 py-2 px-3 rounded-xl bg-blue-500 text-stone-100 border border-blue-500 hover:bg-blue-200 hover:border-blue-500 hover:text-blue-500  dark:bg-cyan-500 dark:text-slate-50 dark:border-cyan-500 dark:hover:bg-cyan-200 dark:hover:text-cyan-500 dark:hover:border-cyan-500"
    >
      <p className="hidden md:block">Nueva categoría</p>
      <FontAwesomeIcon icon={faPlus} />
    </button>
  );
}

export function UpdatePaymentMethod({ onOpen }: ModalButtonProps) {
  return (
    <button
      title="Nuevo método de pago"
      onClick={onOpen}
      className="rounded-md dark:border p-1 md:p-2 bg-blue-600 text-stone-100 hover:bg-blue-200 hover:text-blue-600 dark:bg-slate-600 dark:hover:bg-cyan-400 dark:hover:text-slate-50 dark:border-slate-500"
    >
      <FontAwesomeIcon icon={faPencil} />
    </button>
  );
}

export function DeletePaymentMethod({ id }: { id: number }) {
  return (
    <ConfirmModal
      title="Eliminar método de pago"
      danger
      confirmText="Eliminar"
      onConfirm={() => deletePaymentMethod(id)}
      trigger={
        <button className="rounded-md p-1 md:p-2 bg-red-500 text-white hover:bg-red-400">
          <FontAwesomeIcon icon={faTrash} />
        </button>
      }
    />
  );
}
