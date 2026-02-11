import { Metadata } from "next";
import { robotoFlex } from "@/app/fonts";
export const metadata: Metadata = {
  title: "Dashboard Mantenimiento Usuarios",
};

export default function Page() {
  return (
    <>
      <section className="w-full">
        <div className="mb-5">
          <h1 className={`${robotoFlex.className} text-2xl 2xl:text-4xl font-semibold text-stone-500 dark:text-slate-50`}>
            Mantenimiento usuarios
          </h1>
        </div>
      </section>
    </>
  );
}
