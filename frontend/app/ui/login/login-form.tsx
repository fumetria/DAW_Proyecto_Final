"use client";

import { useActionState } from "react";
import { authenticate } from "@/app/lib/login.action";
import { useSearchParams } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExclamationCircle,
  faLock,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

export default function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined
  );

  return (
    <form
      action={formAction}
      className="bg-stone-100 rounded-xl p-8 shadow-xl "
    >
      <div className="mb-4 flex items-center justify-center">
        <Image src="/logo2.svg" width={60} height={60} alt="App logo" />
      </div>
      <div className="my-1 grid">
        <label htmlFor="email" className="text-black font-semibold">
          User
        </label>
        <div className="text-base flex items-center border-2 rounded py-1 ps-1 gap-2 focus-within:border-2 focus-within:border-blue-400">
          <FontAwesomeIcon
            icon={faUser}
            className="text-stone-400"
            width={20}
          />
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Introduce tu email"
            className=" text-stone-900 outline-none border-none placeholder:text-stone-300"
          />
        </div>
      </div>
      <div className="my-1 grid">
        <label htmlFor="password" className="text-black font-semibold">
          Password
        </label>
        <div className="text-base flex items-center border-2 rounded py-1 ps-1 gap-2 focus-within:border-2 focus-within:border-blue-400">
          <FontAwesomeIcon
            icon={faLock}
            className="text-stone-400"
            width={18}
          />
          <input
            type="text"
            id="password"
            placeholder="Introduce contraseña"
            name="password"
            className=" text-stone-300 outline-none border-none "
          />
        </div>
      </div>
      <div className="mt-5 grid items-center justify-items-center">
        <input type="hidden" name="redirectTo" value={callbackUrl} />
        <button
          className="px-2 py-1 bg-blue-500 rounded border border-transparent text-stone-100 hover:text-blue-500 hover:bg-blue-200 hover:border-blue-500 cursor-pointer"
          aria-disabled={isPending}
        >
          Login
        </button>
      </div>
      <div className="flex gap-2 mt-2" aria-live="polite" aria-atomic="true">
        {errorMessage && (
          <>
            <FontAwesomeIcon
              icon={faExclamationCircle}
              className="text-red-500"
            />
            <p className="text-sm text-red-500">{errorMessage}</p>
          </>
        )}
      </div>
    </form>
  );
}
