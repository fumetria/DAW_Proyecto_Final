import Header from "./ui/components/Header";
import Link from "next/link";
export default function Page() {
  return (
    <>
      <section className="bg-stone-300 dark:bg-slate-900 h-screen w-screen">
        <Header />
        <main className="grid justify-items-center">
          <section className="w-full py-3 hero text-stone-50 bg-blue-400 dark:bg-slate-800 flex justify-center">
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
                  className="bg-blue-700 dark:bg-cyan-500 dark:text-slate-50 rounded-4xl px-3 py-2 font-semibold 2xl:text-xl"
                >
                  Contáctanos
                </Link>
              </div>
            </div>
          </section>
          <section id="features" className="text-stone-100">
            <h3>
              Features section
            </h3>

          </section>
          <section id="pricing">
            <div className="flex gap-3">
              <div className="shadow-xl border-t-4 border-t-blue-500 bg-stone-100 max-w-96">
                <div className="card-header  xl:px-3 xl:py-2">
                  <h3 className="uppercase font-semibold text-lg 2xl:text-xl">pequeña empresa</h3>
                  <p>Ideal para pequeños negocios que no requieren de más de 1 equipo.</p>
                </div>
                <div className="bg-stone-300 xl:px-3 xl:py-2 text-stone-600">
                  <h4><span className="text-5xl font-bold">12</span>€</h4>
                  <p className="text-sm font-light">Alguna observación</p>
                </div>
                <div className="xl:px-3 xl:py-2">
                  <ul>
                    <li>feature 1</li>
                    <li>feature 2</li>
                    <li>feature 3</li>
                    <li>feature 4</li>
                  </ul>
                </div>
                <div className="grid justify-items-center xl:px-3 xl:py-2">
                  <button className="xl:text-xl text-blue-500 border font-semibold border-blue-500 hover:border-transparent hover:bg-blue-500 hover:text-stone-100 w-full px-2 py-1">Contratar</button>
                </div>
              </div>
              <div className="shadow-xl border-t-4 border-t-blue-500 bg-stone-100 max-w-96">
                <div className="card-header  xl:px-3 xl:py-2">
                  <h3 className="uppercase font-semibold text-lg 2xl:text-xl">pequeña empresa</h3>
                  <p>Ideal para pequeños negocios que no requieren de más de 1 equipo.</p>
                </div>
                <div className="bg-stone-300 xl:px-3 xl:py-2 text-stone-600">
                  <h4><span className="text-5xl font-bold">12</span>€</h4>
                  <p className="text-sm font-light">Alguna observación</p>
                </div>
                <div className="xl:px-3 xl:py-2">
                  <ul>
                    <li>feature 1</li>
                    <li>feature 2</li>
                    <li>feature 3</li>
                    <li>feature 4</li>
                  </ul>
                </div>
                <div className="grid justify-items-center xl:px-3 xl:py-2">
                  <button className="xl:text-xl text-blue-500 border font-semibold border-blue-500 hover:border-transparent hover:bg-blue-500 hover:text-stone-100 w-full px-2 py-1">Contratar</button>
                </div>
              </div>
              <div className="shadow-xl border-t-4 border-t-blue-500 bg-stone-100 max-w-96">
                <div className="card-header  xl:px-3 xl:py-2">
                  <h3 className="uppercase font-semibold text-lg 2xl:text-xl">a medida</h3>
                  <p>Ideal para grandes empresas con gran infraestructura.</p>
                </div>
                <div className="bg-stone-300 xl:px-3 xl:py-2 text-stone-600">
                  <h4><span className="text-5xl font-bold">Adaptable</span></h4>
                  <p className="text-sm font-light">Según conveniencia</p>
                </div>
                <div className="xl:px-3 xl:py-2">
                  <ul>
                    <li>feature 1</li>
                    <li>feature 2</li>
                    <li>feature 3</li>
                    <li>feature 4</li>
                  </ul>
                </div>
                <div className="grid justify-items-center xl:px-3 xl:py-2">
                  <button className="xl:text-xl text-blue-500 border font-semibold border-blue-500 hover:border-transparent hover:bg-blue-500 hover:text-stone-100 w-full px-2 py-1">Contratar</button>
                </div>
              </div>
            </div>
          </section>
          <section id="contact">
            <h3>Contact section</h3>
            <form action=""></form>
          </section>
        </main>
        <footer className="bg-blue-500">

        </footer>
      </section>
    </>
  );
}
