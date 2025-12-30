import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export default function Header() {
  return (
    <>
      <header className="bg-stone-100 border-b border-stone-400 py-1 dark:bg-slate-800 dark:border-slate-500 w-screen">
        <section className="flex justify-between items-center mx-5 ">
          <div className="flex items-center gap-2">
            <Image
              src="/vercel.svg"
              alt="Bsness app logo"
              width={30}
              height={30}
              className=""
            />
            <h1 className="text-stone-950 dark:text-slate-50 xl:text-4xl">
              Bsness App
            </h1>
          </div>
          <div></div>
          <div className="">
            <Link
              href={"/login"}
              className="flex gap-1 rounded bg-blue-600 dark:bg-cyan-500 dark:hover:bg-cyan-200 text-slate-50 dark:hover:text-cyan-500 hover:cursor-pointer px-2 py-1 items-center font-semibold"
            >
              <FontAwesomeIcon icon={faUser} size="lg" className="" />
              <p>Acceder</p>
            </Link>
          </div>
        </section>
      </header>
    </>
  );
}
