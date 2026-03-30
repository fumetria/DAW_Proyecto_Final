"use client";

import { useActionState, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { TaxFormState, updateTax } from "@/app/lib/actions";
import { Button } from "@/app/ui/components/button";
import { tax } from "@/app/lib/types/types";

interface EditTaxModalProps {
  tax: tax | null;
  onClose: () => void;
  open: boolean;
}

export default function EditTaxModal({
  tax,
  onClose,
  open,
}: EditTaxModalProps) {
  const [state, formAction] = useActionState<
    TaxFormState | null,
    FormData
  >(
    (prev: TaxFormState | null, fd: FormData) =>
      updateTax(tax ? tax.id : 0, prev, fd),
    null,
  );

  const [valueStr, setValueStr] = useState<string>(
    tax != null ? String(tax.value) : "",
  );

  useEffect(() => {
    if (tax != null) setValueStr(String(tax.value));
  }, [tax]);

  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-md rounded-xl bg-white shadow-xl dark:bg-slate-800 dark:text-slate-50">
        <div className="flex justify-between items-center bg-stone-700 dark:bg-slate-700 text-stone-100 dark:text-slate-50 px-4 py-3 rounded-t-xl">
          <h3 className="font-semibold text-lg">Editar tipo de IVA</h3>
          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer hover:font-bold text-xl leading-none"
          >
            ✕
          </button>
        </div>

        <form action={formAction} aria-describedby="form-error-edit-tax">
          <div className="rounded-md bg-stone-100 dark:bg-slate-800 p-4 md:p-6 dark:text-slate-50">
            <div className="grid mb-4">
              <label htmlFor="tax_value_edit" className="mb-2 text-sm">
                Porcentaje IVA (0–100)
              </label>
              <input
                type="number"
                min={0}
                max={100}
                step={1}
                placeholder="Ej: 21"
                id="tax_value_edit"
                name="tax_value"
                className="peer block w-full rounded-md py-2 pl-10 border border-stone-200  text-sm placeholder:text-gray-500 dark:border-slate-400 dark:bg-slate-900 dark:text-slate-400 focus-within:outline-2 dark:focus:border-cyan-500 dark:outline-cyan-500"
                aria-describedby="tax_value-error"
                value={valueStr}
                onChange={(e) => setValueStr(e.target.value)}
              />
            </div>
            {state?.message && (
              <div
                id="form-error-edit-tax"
                aria-live="polite"
                aria-atomic="true"
                className="mb-4 rounded-md bg-red-100 p-3 text-sm text-red-700"
              >
                {state.message}
              </div>
            )}

            <div className="mt-6 flex justify-end gap-4">
              <button
                type="button"
                onClick={onClose}
                className="flex items-center gap-2 py-2 px-3 rounded-xl bg-stone-400 text-stone-100 border border-stone-400 hover:bg-stone-200 hover:border-stone-400 hover:text-stone-400  dark:bg-slate-400 dark:text-slate-50 dark:border-slate-400 dark:hover:bg-slate-200 dark:hover:text-slate-400 dark:hover:border-slate-400"
              >
                Cancelar
              </button>
              <Button type="submit">Guardar</Button>
            </div>
          </div>
        </form>
      </div>
    </div>,
    document.body,
  );
}
