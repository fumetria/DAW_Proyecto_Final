"use client";

import Image from "next/image";
import LoginForm from "../ui/login/login-form";
import { Suspense } from "react";

export default function Login() {
  return (
    <>
      <main>
        <div className="grid md:grid-cols-6 w-screen h-screen">
          <div className="hidden md:grid col-span-4 bg-linear-to-br from-blue-100 to-blue-500 justify-items-center items-center">
            <div className="text-center">
              <div className="flex justify-center mb-2.5">
                {/* <Image src="/vercel.svg" alt="" width={30} height={30} /> */}
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
      </main>
    </>
  );
}
