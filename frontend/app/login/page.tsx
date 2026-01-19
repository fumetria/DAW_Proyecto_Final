import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faUser } from "@fortawesome/free-solid-svg-icons";

export default function Login() {
  return (
    <>
      <main>
        <div className="grid grid-cols-6 w-screen h-screen">
          <div className="col-span-4 bg-linear-to-b from-blue-100 to-blue-300 grid justify-items-center items-center">
            <div className="text-center">
              <div className="flex justify-center mb-2.5">
                <Image src="/vercel.svg" alt="" width={30} height={30} />
                <h1 className="text-stone-100 font-bold text-5xl">
                  Bsness App
                </h1>
              </div>
              <p className="text-2xl font-extralight uppercase">
                Gestión de facturación en la nube
              </p>
            </div>
          </div>
          <div className="bg-stone-300 col-span-2 grid justify-items-center items-center ">
            <form
              action="action"
              className="bg-stone-100 rounded-xl p-8 shadow-xl "
            >
              <div className="mb-4 flex items-center justify-center">
                <Image src="/logo2.svg" width={60} height={60} alt="App logo" />
              </div>
              <div className="my-1 grid">
                <label htmlFor="user-name" className="text-black font-semibold">
                  User
                </label>
                <div className="text-base flex items-center border-2 rounded py-1 ps-1 gap-2 focus-within:border-2 focus-within:border-blue-400">
                  <FontAwesomeIcon
                    icon={faUser}
                    className="text-stone-400"
                    width={20}
                  />
                  <input
                    type="text"
                    id="user-name"
                    name="user-name"
                    placeholder="User name"
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
                    placeholder="Password"
                    name="password"
                    className=" text-stone-300 outline-none border-none "
                  />
                </div>
              </div>
              <div className="mt-5 grid items-center justify-items-center">
                <button className="px-2 py-1 bg-blue-400 rounded border text-stone-100 hover:text-blue-400 hover:border hover:bg-blue-200 border-blue-400 cursor-pointer">
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}
