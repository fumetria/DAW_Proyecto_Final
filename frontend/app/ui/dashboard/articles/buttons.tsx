import { faPencilRuler } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export function UpdateArticle({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/maintance/articles/${id}/edit`}
      className="rounded-md dark:border p-2 bg-blue-600 hover:bg-gray-100 dark:bg-slate-800 dark:hover:bg-cyan-400 dark:hover:text-slate-500 dark:border-slate-500"
    >
      <FontAwesomeIcon icon={faPencilRuler} />
    </Link>
  );
}
