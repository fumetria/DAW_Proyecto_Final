"use client";

import { useState } from "react";
import { createPortal } from "react-dom";

type ConfirmModalProps = {
  title: string;
  trigger: React.ReactNode; // botón / icono que abre el modal
  onConfirm: () => void;
  confirmText?: string;
  cancelText?: string;
  danger?: boolean;
};

export default function ConfirmModal({
  title,
  trigger,
  onConfirm,
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  danger = false,
}: ConfirmModalProps) {
  const [open, setOpen] = useState(false);

  const close = () => setOpen(false);

  return (
    <>
      <span onClick={() => setOpen(true)} className="inline-flex">
        {trigger}
      </span>

      {open &&
        createPortal(
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="w-72 rounded-xl bg-white shadow-xl">
              {/* Header */}
              <div className="flex justify-between items-center bg-stone-700 dark:bg-slate-600 text-stone-100 dark:text-slate-50 px-3 py-2 rounded-t-xl">
                <h3 className="font-light">{title}</h3>
                <button
                  onClick={close}
                  className="cursor-pointer hover:font-semibold"
                >
                  ✕
                </button>
              </div>

              {/* Body */}
              <div className="p-4 text-center bg-stone-100 dark:bg-slate-800 dark:text-slate-50">
                <p>¿Estás seguro de que deseas continuar?</p>
              </div>

              {/* Actions */}
              <div className="flex justify-between gap-2 p-4 pt-0 dark:bg-slate-800 dark:text-slate-50">
                <button
                  onClick={close}
                  className="flex items-center gap-2 py-2 px-3 rounded-xl bg-stone-400 text-stone-100 border border-stone-400 hover:bg-stone-200 hover:border-stone-400 hover:text-stone-400  dark:bg-slate-600 dark:text-slate-50 dark:border-slate-600 dark:hover:bg-slate-200 dark:hover:text-slate-600 dark:hover:border-slate-600"
                >
                  {cancelText}
                </button>

                <button
                  onClick={() => {
                    onConfirm();
                    close();
                  }}
                  className={`flex-1 rounded-lg border border-transparent py-2 ${
                    danger
                      ? "text-stone-100 bg-red-600 hover:bg-red-300 hover:text-red-600 hover:border-red-600"
                      : "bg-blue-500 hover:bg-blue-300 hover:text-blue-600 hover:border-blue-600"
                  }`}
                >
                  {confirmText}
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
