import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPowerOff } from "@fortawesome/free-solid-svg-icons";

import { signOut } from "@/auth";

export default function HeaderApp() {
  return (
    <>
      <header className="shadow bg-stone-100 border-b border-stone-400 py-2 dark:bg-slate-950 dark:border-slate-500 w-screen">
        <section className="flex justify-between items-center mx-5 ">
          <div className="flex items-center gap-1">
            <Image
              src="/logo2.svg"
              alt="Bsness app logo"
              width={65}
              height={65}
              className=""
            />
            <h1 className="text-stone-950 dark:text-slate-50 md:text-4xl 2xl:text-5xl font-light">
              BsnessApp
            </h1>
          </div>
          <div className="flex gap-2 items-center"></div>
          <div className="flex gap-4 items-center justify-center">
            <button
              onClick={async () => {
                "use server";
                await signOut({ redirectTo: "/" });
              }}
              className="flex gap-1 rounded text-stone-100 bg-red-500 hover:bg-red-300 dark:bg-cyan-500 dark:hover:bg-cyan-200 dark:text-slate-50 dark:hover:text-cyan-500 hover:cursor-pointer px-2 py-1 items-center font-semibold"
            >
              <FontAwesomeIcon icon={faPowerOff} />
              <div className="hidden md:block">Logout</div>
            </button>
          </div>
        </section>
      </header>
    </>
  );
}
