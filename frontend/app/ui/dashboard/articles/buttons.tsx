import { faPencil, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export function UpdateArticle({ id }: { id: string }) {
  return (
    <Link
      title="Actualizar articulo"
      href={`/dashboard/maintance/articles/${id}/edit`}
      className="rounded-md dark:border p-2 bg-blue-600 text-stone-100 hover:bg-blue-200 hover:text-blue-600 dark:bg-slate-600 dark:hover:bg-cyan-400 dark:hover:text-slate-50 dark:border-slate-500"
    >
      <FontAwesomeIcon icon={faPencil} />
    </Link>
  );
}

export function CreateArticle() {
  return (
    <Link
      title="Nuevo artículo"
      href={`/dashboard/maintance/articles/create/`}
      className="flex items-center gap-2 py-2 px-3 rounded-xl bg-blue-500 text-stone-100 border border-blue-500 hover:bg-blue-200 hover:border-blue-500 hover:text-blue-500  dark:bg-cyan-500 dark:text-slate-50 dark:border-cyan-500 dark:hover:bg-cyan-200 dark:hover:text-cyan-500 dark:hover:border-cyan-500"
    >
      <p>Nuevo Artículo</p>
      <FontAwesomeIcon icon={faPlus} />
    </Link>
  );
}
