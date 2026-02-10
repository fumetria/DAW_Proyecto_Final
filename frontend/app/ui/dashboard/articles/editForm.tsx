"use client";

import { updateArticle, State } from "@/app/lib/actions";
import { article, category } from "@/app/lib/types/types";
import { useActionState } from "react";
import { robotoSans } from "@/app/fonts";
import Link from "next/link";
import { Button } from "../../components/button";

export default function UpdateArticleForm({
  articleSelected,
  categoryList,
}: {
  articleSelected: article;
  categoryList: category[];
}) {
  const updateArticleWithId = updateArticle.bind(null, articleSelected.id);
  const initialState: State = { message: null, errors: {} };
  const [state, formAction] = useActionState(updateArticleWithId, initialState);
  return (
    <form action={formAction} aria-describedby="form-error">
      <div className="rounded-md bg-stone-100 dark:bg-slate-800 p-4 md:p-6 dark:text-slate-50">
        <div className="grid mb-4">
          <label htmlFor="cod_art" className="mb-2">
            Código artículo
          </label>
          <input
            type="text"
            placeholder="Introduce código del artículo"
            id="cod_art"
            name="cod_art"
            defaultValue={articleSelected.cod_art}
            className="peer block w-full rounded-md py-2 pl-10 border border-stone-200  text-sm placeholder:text-gray-500 dark:border-slate-400 dark:bg-slate-900 dark:text-slate-400 focus-within:outline-2 dark:focus:border-cyan-500 dark:outline-cyan-500"
            aria-describedby="cod_art-error"
          />
          <div id="cod_art-error" aria-live="polite" aria-atomic="true">
            {state.errors?.cod_art &&
              state.errors.cod_art.map((error: string) => (
                <p className="mt-2 text-sm text-red-600" key={error}>
                  {" "}
                  {error}
                </p>
              ))}
          </div>
        </div>
        <div className="grid mb-4">
          <label htmlFor="name" className="mb-2">
            Nombre
          </label>
          <input
            type="text"
            placeholder="Introduce nombre del artículo"
            id="name"
            name="name"
            defaultValue={articleSelected.name}
            className="peer block w-full rounded-md py-2 pl-10 border border-stone-200  text-sm placeholder:text-gray-500 dark:border-slate-400 dark:bg-slate-900 dark:text-slate-400 focus-within:outline-2 dark:focus:border-cyan-500 dark:outline-cyan-500"
            aria-describedby="name-error"
          />
          <div id="name-error" aria-live="polite" aria-atomic="true">
            {state.errors?.name &&
              state.errors.name.map((error: string) => (
                <p className="mt-2 text-sm text-red-600" key={error}>
                  {" "}
                  {error}
                </p>
              ))}
          </div>
        </div>
        <div className="grid mb-4">
          <label htmlFor="pvp" className="mb-2">
            Precio
          </label>
          <input
            placeholder="Introduce precio en EUR"
            id="pvp"
            type="number"
            step="0.01"
            name="pvp"
            defaultValue={articleSelected.pvp}
            className="peer block w-full rounded-md py-2 pl-10 border border-stone-200  text-sm placeholder:text-gray-500 dark:border-slate-400 dark:bg-slate-900 dark:text-slate-400 focus-within:outline-2 dark:focus:border-cyan-500 dark:outline-cyan-500"
            aria-describedby="pvp-error"
          />
        </div>
        <div id="pvp-error" aria-live="polite" aria-atomic="true">
          {state.errors?.pvp &&
            state.errors.pvp.map((error: string) => (
              <p className="mt-2 text-sm text-red-600" key={error}>
                {" "}
                {error}
              </p>
            ))}
        </div>
        <div className="grid mb-4">
          <label htmlFor="category" className="mb-2">
            Categoria
          </label>
          <select
            name="category"
            id="category"
            className={`${robotoSans.className} peer block w-full rounded-md py-2 pl-10 border border-stone-200  text-sm placeholder:text-gray-500 dark:border-slate-400 dark:bg-slate-900 dark:text-slate-400 focus-within:outline-2 dark:focus:border-cyan-500 dark:outline-cyan-500`}
            aria-describedby="category-error"
            defaultValue={articleSelected.category}
          >
            <option value="" className={`${robotoSans.className}`} disabled>
              Selecciona categoria
            </option>
            {categoryList?.map((category) => {
              const categoryLabel = category.name
                .toString()
                .toLocaleUpperCase();
              return (
                <option
                  key={category.id}
                  value={category.id}
                  className={`${robotoSans.className}`}
                >
                  {categoryLabel}
                </option>
              );
            })}
          </select>
          <div>
            {state.errors?.category &&
              state.errors.category.map((error: string) => (
                <p className="mt-2 text-sm text-red-600" key={error}>
                  {error}
                </p>
              ))}
          </div>
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
            href="/dashboard/maintance/articles"
            className="flex items-center gap-2 py-2 px-3 rounded-xl bg-stone-400 text-stone-100 border border-stone-400 hover:bg-stone-200 hover:border-stone-400 hover:text-stone-400  dark:bg-slate-400 dark:text-slate-50 dark:border-slate-400 dark:hover:bg-slate-200 dark:hover:text-slate-400 dark:hover:border-slate-400"
          >
            Cancelar
          </Link>
          <Button type="submit">Actualizar artículo</Button>
        </div>
      </div>
    </form>
  );
}
