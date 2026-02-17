"use client";

import LoginForm from "../ui/login/login-form";
import { Suspense } from "react";

export default function Login() {
  return (
    <>
      <main>
        <section id="light-theme" className="dark:hidden">
          <div className="grid md:grid-cols-6 w-screen h-screen">
            <div className="hidden md:grid col-span-4 bg-linear-to-br from-blue-100 to-blue-500 justify-items-center items-center">
              <div className="text-center">
                <div className="flex justify-center mb-2.5">
                  <h1 className="text-stone-100 font-semibold text-5xl">
                    BsnessApp
                  </h1>
                </div>
                <p className="text-2xl text-stone-200 font-extralight uppercase">
                  Tu facturación desde la nube empieza aquí
                </p>
              </div>
            </div>
            <div className="login-bg col-span-2 grid justify-items-center items-center ">
              <Suspense>
                <LoginForm />
              </Suspense>
            </div>
          </div>
        </section>
        <section id="dark-theme" className="hidden dark:block relative">
          <div className="grid md:grid-cols-6 w-screen h-screen">
            <div className="hidden md:grid col-span-4 relative bg-linear-to-b from-transparent to-slate-900 justify-items-center items-center">
              <div
                id="dark-theme-content"
                className="absolute z-50 text-center"
              >
                <div className="flex justify-center mb-2.5">
                  <h1 className="text-stone-500 dark:text-slate-100 font-semibold text-5xl">
                    BsnessApp
                  </h1>
                </div>
                <p className="text-2xl text-stone-200 dark:text-slate-100 font-extralight uppercase">
                  Tu facturación desde la nube empieza aquí
                </p>
              </div>
              {/* <div className="absolute animate-pulse z-0 w-150 h-150 rounded-full bg-radial from-cyan-600  to-cyan-200 blur-3xl"></div> */}
              <div className="absolute animate-pulse w-150 h-150 rounded-tl-full rounded-br-full rounded-tr-full bg-linear-to-b from-indigo-500 from-10% via-blue-500 via-30% to-cyan-300 to-100% blur-2xl"></div>
            </div>
            <div className="dark:bg-slate-950 col-span-2 grid justify-items-center items-center ">
              <Suspense>
                <LoginForm />
              </Suspense>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
