"use client";

import Link from "next/link";
import { Button } from "@/app/ui/components/button";
import { createCategory, State } from "@/app/lib/actions";
import { useActionState } from "react";

export default function CreateACategoryForm() {
  const initialState: State = { message: null, errors: {} };
  const [state, formAction] = useActionState(createCategory, initialState);

  return (
    <form action={formAction} aria-describedby="form-error">
      <div className="rounded-md bg-stone-100 dark:bg-slate-800 p-4 md:p-6 dark:text-slate-50">
        <div className="grid mb-4">
          <label htmlFor="category-name">Nombre Categoría</label>
          <input
            type="text"
            placeholder="Introduce nombre categoría"
            id="category_name"
            name="category_name"
            className="peer block w-full rounded-md py-2 pl-10 border border-stone-200  text-sm placeholder:text-gray-500 dark:border-slate-400 dark:bg-slate-900 dark:text-slate-400 focus-within:outline-2 dark:focus:border-cyan-500 dark:outline-cyan-500"
            aria-describedby="category_name-error"
          />
        </div>
        {state.message && (
          <div
            id="form-error"
            aria-live="polite"
            aria-atomic="true"
            className="mb-4 rounded-md bg-red-100 p-3 text-sm text-red-700"
          >
            {state.message}
          </div>
        )}

        <div className="mt-6 flex justify-end gap-4">
          <Link
            href="/dashboard/maintance/categories"
            className="flex items-center gap-2 py-2 px-3 rounded-xl bg-stone-400 text-stone-100 border border-stone-400 hover:bg-stone-200 hover:border-stone-400 hover:text-stone-400  dark:bg-slate-400 dark:text-slate-50 dark:border-slate-400 dark:hover:bg-slate-200 dark:hover:text-slate-400 dark:hover:border-slate-400"
          >
            Cancelar
          </Link>
          <Button type="submit">Crear categoría</Button>
        </div>
      </div>
    </form>
  );
}
