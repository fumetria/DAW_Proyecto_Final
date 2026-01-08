import Header from "./ui/components/Header";
import Link from "next/link";
export default function Home() {
  return (
    <>
      <section className="bg-stone-400 dark:bg-slate-900 h-screen w-screen">
        <Header />
        <main className="">
          <section className="w-full dark:bg-slate-800 flex justify-center">
            <div className="max-w-4xl py-8">
              <h1 className="dark:text-slate-50 font-bold 2xl:text-6xl text-wrap text-center mb-3 ">
                Tu facturación desde la nube
              </h1>
              <p className="text-center dark:text-slate-50 text-2xl font-light mb-6">
                Factura sin complicaciones con BsnessApp
              </p>
              <div className="flex justify-center">
                <Link
                  href={"#contact"}
                  className="dark:bg-cyan-500 dark:text-slate-50 rounded-xl px-2 py-1 font-semibold 2xl:text-xl"
                >
                  Contáctanos
                </Link>
              </div>
            </div>
          </section>
          <section id="contact"></section>
        </main>
      </section>
    </>
  );
}
