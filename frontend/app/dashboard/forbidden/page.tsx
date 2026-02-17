import { Metadata } from "next";
import Link from "next/link";
import { robotoFlex } from "@/app/fonts";

export const metadata: Metadata = {
  title: "Acceso denegado",
};

export default function ForbiddenPage() {
  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center gap-6 p-6">
      <h1
        className={`${robotoFlex.className} text-2xl 2xl:text-4xl font-semibold text-stone-500 dark:text-slate-50`}
      >
        403 Forbidden
      </h1>
      <p className="text-center text-stone-600 dark:text-slate-400">
        No tienes permiso para acceder a este contenido.
      </p>
      <Link
        href="/dashboard"
        className={`${robotoFlex.className} rounded-md bg-blue-500 px-4 py-2 font-semibold text-stone-200 hover:bg-blue-300 dark:bg-cyan-600 dark:text-slate-100 dark:hover:bg-cyan-400`}
      >
        Volver a Inicio
      </Link>
    </main>
  );
}
