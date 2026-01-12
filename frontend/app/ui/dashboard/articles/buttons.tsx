import { faPencil } from "@fortawesome/free-solid-svg-icons";
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
