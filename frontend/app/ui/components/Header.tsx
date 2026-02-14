"use client";

import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import dynamic from "next/dynamic";

const SetTheme = dynamic(() => import("./ThemeToggler"), {
  ssr: false,
});

export default function Header() {
  return (
    <>
      <header className="bg-stone-50/80 backdrop-blur-md border-b border-stone-200 py-2 dark:bg-slate-900/80 dark:border-slate-800 w-full shadow top-0 z-50">
        <section className="flex justify-between items-center mx-auto max-w-7xl px-5 md:px-3">
          <Link className="flex items-center gap-1" href={"/"}>
            <Image
              src="/logo2.svg"
              alt="Bsness app logo"
              width={65}
              height={65}
              className="hidden md:block"
            />
            <h1 className="text-stone-950 dark:text-slate-50 text-2xl md:text-4xl 2xl:text-5xl font-light">
              BsnessApp
            </h1>
          </Link>
          <div className="flex gap-2 items-center">
            <SetTheme />
          </div>
          <div
            title="Acceder"
            className="flex gap-4 items-center justify-center"
          >
            <Link
              href={"/login"}
              className="flex gap-1 rounded bg-blue-600 hover:bg-blue-200 text-stone-50 hover:text-blue-500 dark:bg-cyan-500 dark:hover:bg-cyan-200 dark:text-slate-50 dark:hover:text-cyan-500 hover:cursor-pointer px-2 py-1 items-center font-semibold"
            >
              <FontAwesomeIcon icon={faUser} size="lg" className="" />
              <p className="hidden md:block">Acceder</p>
            </Link>
          </div>
        </section>
      </header>
    </>
  );
}
