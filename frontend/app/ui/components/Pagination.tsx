"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { PaginationProps } from "@/app/lib/types/pagination";

const ITEMS_PER_PAGE = 10;

export function getTotalPages(totalCount: number): number {
  return Math.max(1, Math.ceil(totalCount / ITEMS_PER_PAGE));
}

export default function Pagination({
  totalCount,
  currentPage,
  preserveParams = ["query", "tab", "dateFrom", "dateTo"],
}: PaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const totalPages = getTotalPages(totalCount);

  if (totalCount === 0 || totalPages <= 1) return null;

  function buildUrl(page: number): string {
    const params = new URLSearchParams(searchParams?.toString() ?? "");
    params.set("page", String(page));
    // Keep only allowed params
    const filtered = new URLSearchParams();
    preserveParams.forEach((key: string) => {
      const v = params.get(key);
      if (v != null && v !== "") filtered.set(key, v);
    });
    filtered.set("page", String(page));
    const q = filtered.toString();
    return q ? `${pathname}?${q}` : pathname;
  }

  const prevPage = Math.max(1, currentPage - 1);
  const nextPage = Math.min(totalPages, currentPage + 1);

  return (
    <nav
      className="mt-4 flex flex-wrap items-center justify-center gap-2"
      aria-label="Paginación"
    >
      <Link
        href={buildUrl(prevPage)}
        className={`inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
          currentPage <= 1
            ? "pointer-events-none cursor-default bg-stone-200 text-stone-400 dark:bg-slate-700 dark:text-slate-500"
            : "bg-stone-200 text-stone-700 hover:bg-stone-300 dark:bg-slate-600 dark:text-slate-200 dark:hover:bg-slate-500"
        }`}
        aria-disabled={currentPage <= 1}
      >
        <FontAwesomeIcon icon={faChevronLeft} />
        Anterior
      </Link>

      <div className="flex items-center gap-1">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
          const isCurrent = page === currentPage;
          return (
            <Link
              key={page}
              href={buildUrl(page)}
              className={`min-w-9 rounded-lg px-3 py-2 text-center text-sm font-medium transition-colors ${
                isCurrent
                  ? "bg-blue-600 text-white dark:bg-cyan-500 dark:text-slate-900"
                  : "bg-stone-200 text-stone-700 hover:bg-stone-300 dark:bg-slate-600 dark:text-slate-200 dark:hover:bg-slate-500"
              }`}
              aria-current={isCurrent ? "page" : undefined}
            >
              {page}
            </Link>
          );
        })}
      </div>

      <Link
        href={buildUrl(nextPage)}
        className={`inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
          currentPage >= totalPages
            ? "pointer-events-none cursor-default bg-stone-200 text-stone-400 dark:bg-slate-700 dark:text-slate-500"
            : "bg-stone-200 text-stone-700 hover:bg-stone-300 dark:bg-slate-600 dark:text-slate-200 dark:hover:bg-slate-500"
        }`}
        aria-disabled={currentPage >= totalPages}
      >
        Siguiente
        <FontAwesomeIcon icon={faChevronRight} />
      </Link>

      <span className="ml-2 text-sm text-stone-500 dark:text-slate-400">
        Página {currentPage} de {totalPages} ({totalCount} en total)
      </span>
    </nav>
  );
}
