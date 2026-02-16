"use client";

import LoginForm from "../ui/login/login-form";
import { Suspense } from "react";

export default function Login() {
  return (
    <>
      <main>
        <section className="dark:hidden">
          <div className="grid md:grid-cols-6 w-screen h-screen">
            <div className="hidden md:grid col-span-4 bg-linear-to-br from-blue-100 to-blue-500 justify-items-center items-center">
              <div className="text-center">
                <div className="flex justify-center mb-2.5">
                  <h1 className="text-stone-100 font-semibold text-5xl">
                    BsnessApp
                  </h1>
                </div>
                <p className="text-2xl text-stone-200 font-extralight uppercase">
                  Gestión de facturación en la nube
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
        <section className="hidden dark:block">
          <div className="grid md:grid-cols-6 w-screen h-screen">
            <div className="hidden md:grid col-span-4 bg-linear-to-b from-slate-800 to-slate-900 justify-items-center items-center">
              <div className="text-center">
                <div className="flex justify-center mb-2.5">
                  <h1 className="text-stone-100 dark:text-slate-200 font-semibold text-5xl">
                    BsnessApp
                  </h1>
                </div>
                <p className="text-2xl text-stone-200 dark:text-slate-200 font-extralight uppercase">
                  Gestión de facturación en la nube
                </p>
              </div>
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
