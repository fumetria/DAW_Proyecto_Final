import Link from "next/link";
import Header from "./ui/components/Header";

export default function NotFound() {
  return (
    <>
      <div className="flex flex-col min-h-screen bg-stone-50 dark:bg-slate-950">
        <div className="sticky top-0 z-50">
          <Header />
        </div>
        <main className="flex flex-col items-center justify-center h-screen gap-3">
          <h1 className="text-6xl font-bold md:text-7xl 2xl:text-9xl dark:text-slate-50">
            404
          </h1>
          <h2 className="text-4xl font-semibold md:text-4xl 2xl:text-5xl dark:text-slate-50">
            Página no encontrada
          </h2>
          <p className="text-lg md:text-xl 2xl:text-2xl text-stone-500 dark:text-slate-400">
            La página que está buscando no la encontramos.
          </p>
          <Link
            href="/"
            className="border-b-2 border-transparent dark:text-cyan-500 dark:hover:text-cyan-700 dark:hover:border-b-cyan-700 text-blue-500 hover:text-blue-700 hover:border-b-blue-700"
          >
            Volver a Inicio
          </Link>
        </main>
      </div>
    </>
  );
}
