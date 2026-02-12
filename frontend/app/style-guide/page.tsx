import Header from "@/app/ui/components/Header";
import { robotoSans, robotoFlex } from "@/app/fonts";
import { Button } from "@/app/ui/components/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock, faChartLine } from "@fortawesome/free-solid-svg-icons";
import clsx from "clsx";
import { CardDashboardSkeleton } from "../ui/dashboard/skeletons";

export default function StyleGuidePage() {
  return (
    <main className=" bg-stone-50 dark:bg-slate-900 text-stone-900 dark:text-slate-50">
      <div className="grid justify-items-center  w-full">
        <Header />
        <div className="">
          <div className="container mx-auto px-4 py-8 max-w-7xl">
            <h1 className={`${robotoSans.className} text-4xl font-bold mb-8`}>
              Guía de estilo del proyecto
            </h1>

            {/* Typography Section */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 border-b pb-2 border-stone-300 dark:border-slate-700">
                Tipografía
              </h2>
              <div className="grid gap-4">
                <div>
                  <p className="text-sm text-gray-500 mb-1">
                    Font Family: Roboto (Sans)
                  </p>
                  <h1 className={`${robotoSans.className} text-4xl font-bold`}>
                    H1 Heading (4xl Bold)
                  </h1>
                  <h2 className={`${robotoSans.className} text-3xl font-bold`}>
                    H2 Heading (3xl Bold)
                  </h2>
                  <h3 className={`${robotoSans.className} text-2xl font-bold`}>
                    H3 Heading (2xl Bold)
                  </h3>
                  <h4 className={`${robotoSans.className} text-xl font-bold`}>
                    H4 Heading (xl Bold)
                  </h4>
                  <p className={`${robotoSans.className} text-base`}>
                    Body text (base). Lorem ipsum dolor sit amet, consectetur
                    adipiscing elit.
                  </p>
                  <p className={`${robotoSans.className} text-sm`}>
                    Small text (sm). Sed do eiusmod tempor incididunt ut labore
                    et dolore magna aliqua.
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">
                    Font Family: Roboto Flex
                  </p>
                  <p className={`${robotoFlex.className} text-base`}>
                    Este texto usa Roboto Flex (500 weight).
                  </p>
                </div>
              </div>
            </section>

            {/* Colors Section */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 border-b pb-2 border-stone-300 dark:border-slate-700">
                Colores
              </h2>

              <h3 className="text-xl font-semibold mb-2">
                Blue Palette (Primary Actions)
              </h3>
              <div className="flex flex-wrap gap-4 mb-6">
                <ColorSwatch
                  bg="bg-blue-200"
                  text="text-blue-800"
                  label="blue-200"
                  hex="#BFDBFE"
                />
                <ColorSwatch
                  bg="bg-blue-400"
                  text="text-white"
                  label="blue-400"
                  hex="#60A5FA"
                />
                <ColorSwatch
                  bg="bg-blue-500"
                  text="text-white"
                  label="blue-500"
                  hex="#3B82F6"
                />
                <ColorSwatch
                  bg="bg-blue-600"
                  text="text-white"
                  label="blue-600"
                  hex="#2563EB"
                />
                <ColorSwatch
                  bg="bg-blue-800"
                  text="text-white"
                  label="blue-800"
                  hex="#1E40AF"
                />
              </div>

              <h3 className="text-xl font-semibold mb-2">
                Stone Palette (Light Theme Neutrals)
              </h3>
              <div className="flex flex-wrap gap-4 mb-6">
                <ColorSwatch
                  bg="bg-stone-100"
                  text="text-stone-800"
                  label="stone-100"
                  hex="#F5F5F4"
                />
                <ColorSwatch
                  bg="bg-stone-200"
                  text="text-stone-800"
                  label="stone-200"
                  hex="#E7E5E4"
                />
                <ColorSwatch
                  bg="bg-stone-300"
                  text="text-stone-800"
                  label="stone-300"
                  hex="#D6D3D1"
                />
                <ColorSwatch
                  bg="bg-stone-400"
                  text="text-stone-800"
                  label="stone-400"
                  hex="#A8A29E"
                />
                <ColorSwatch
                  bg="bg-stone-500"
                  text="text-white"
                  label="stone-500"
                  hex="#78716C"
                />
                <ColorSwatch
                  bg="bg-stone-600"
                  text="text-white"
                  label="stone-600"
                  hex="#57534E"
                />
                <ColorSwatch
                  bg="bg-stone-800"
                  text="text-white"
                  label="stone-800"
                  hex="#292524"
                />
                <ColorSwatch
                  bg="bg-stone-900"
                  text="text-white"
                  label="stone-900"
                  hex="#1C1917"
                />
              </div>

              <h3 className="text-xl font-semibold mb-2">
                Slate Palette (Dark Theme Neutrals)
              </h3>
              <div className="flex flex-wrap gap-4 mb-6">
                <ColorSwatch
                  bg="bg-slate-50"
                  text="text-slate-900"
                  label="slate-50"
                  hex="#F8FAFC"
                />
                <ColorSwatch
                  bg="bg-slate-200"
                  text="text-slate-900"
                  label="slate-200"
                  hex="#E2E8F0"
                />
                <ColorSwatch
                  bg="bg-slate-400"
                  text="text-slate-900"
                  label="slate-400"
                  hex="#94A3B8"
                />
                <ColorSwatch
                  bg="bg-slate-500"
                  text="text-white"
                  label="slate-500"
                  hex="#64748B"
                />
                <ColorSwatch
                  bg="bg-slate-700"
                  text="text-white"
                  label="slate-700"
                  hex="#334155"
                />
                <ColorSwatch
                  bg="bg-slate-800"
                  text="text-white"
                  label="slate-800"
                  hex="#1E293B"
                />
                <ColorSwatch
                  bg="bg-slate-900"
                  text="text-white"
                  label="slate-900"
                  hex="#0F172A"
                />
                <ColorSwatch
                  bg="bg-slate-950"
                  text="text-white"
                  label="slate-950"
                  hex="#020617"
                />
              </div>

              <h3 className="text-xl font-semibold mb-2">
                Cyan Palette (Dark Theme Accents)
              </h3>
              <div className="flex flex-wrap gap-4 mb-6">
                <ColorSwatch
                  bg="bg-cyan-200"
                  text="text-cyan-800"
                  label="cyan-200"
                  hex="#A5F3FC"
                />
                <ColorSwatch
                  bg="bg-cyan-400"
                  text="text-cyan-900"
                  label="cyan-400"
                  hex="#22D3EE"
                />
                <ColorSwatch
                  bg="bg-cyan-500"
                  text="text-white"
                  label="cyan-500"
                  hex="#06B6D4"
                />
                <ColorSwatch
                  bg="bg-cyan-600"
                  text="text-white"
                  label="cyan-600"
                  hex="#0891B2"
                />
                <ColorSwatch
                  bg="bg-cyan-800"
                  text="text-white"
                  label="cyan-800"
                  hex="#155E75"
                />
              </div>
              <h3 className="text-xl font-semibold mb-2">System Colors</h3>
              <div className="flex flex-wrap gap-4 mb-6">
                <ColorSwatch
                  bg="bg-red-500"
                  text="text-white"
                  label="red-500 (Error)"
                  hex="#EF4444"
                />
                <ColorSwatch
                  bg="bg-green-500"
                  text="text-white"
                  label="green-500 (Success)"
                  hex="#22C55E"
                />
              </div>
            </section>

            {/* Components Section */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 border-b pb-2 border-stone-300 dark:border-slate-700">
                Componentes
              </h2>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4">Buttons</h3>
                  <div className="flex flex-col gap-4 items-start">
                    <Button>Primary Button</Button>
                    <Button className="w-full justify-center">
                      Full Width Button
                    </Button>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4">Form Inputs</h3>
                  <div className="space-y-4 max-w-sm">
                    <div className="grid">
                      <label
                        htmlFor="example-email"
                        className="font-semibold mb-1"
                      >
                        Email Input
                      </label>
                      <div className="text-base flex items-center border-2 rounded-lg py-1 ps-1 gap-2 focus-within:border-2 focus-within:border-blue-500 bg-white dark:bg-slate-800 dark:border-slate-600">
                        <FontAwesomeIcon
                          icon={faUser}
                          className="text-stone-400 dark:text-slate-400 pl-2"
                          width={20}
                        />
                        <input
                          type="email"
                          id="example-email"
                          placeholder="Introduce tu email"
                          className="w-full text-stone-900 dark:text-slate-100 outline-none border-none bg-transparent"
                        />
                      </div>
                    </div>

                    <div className="grid">
                      <label
                        htmlFor="example-password"
                        className="font-semibold mb-1"
                      >
                        Password Input
                      </label>
                      <div className="text-base flex items-center border-2 rounded-lg py-1 ps-1 gap-2 focus-within:border-2 focus-within:border-blue-500 bg-white dark:bg-slate-800 dark:border-slate-600">
                        <FontAwesomeIcon
                          icon={faLock}
                          className="text-stone-400 dark:text-slate-400 pl-2"
                          width={18}
                        />
                        <input
                          type="password"
                          id="example-password"
                          placeholder="Introduce contraseña"
                          className="w-full text-stone-900 dark:text-slate-100 outline-none border-none bg-transparent"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Wireframes Section */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 border-b pb-2 border-stone-300 dark:border-slate-700">
                Wireframes
              </h2>
              <h3 className="text-2xl font-bold mb-4 pb-2">Páginas</h3>

              <h3 className="text-2xl font-bold mb-4  pb-2">Componentes</h3>
              <div className="grid gap-8">
                {/* Dashboard Card Wireframe */}
                <div>
                  <h3 className="text-xl font-semibold mb-4">
                    Dashboard Metric Card
                  </h3>
                  <div className="p-6 rounded-xl bg-white dark:bg-slate-800 shadow-sm border border-stone-200 dark:border-slate-700 w-64">
                    <div className="flex items-center justify-between mb-4">
                      <div className="h-4 w-24 bg-stone-300 dark:bg-slate-600 rounded animate-pulse"></div>
                      <div className="h-8 w-8 bg-blue-100 dark:bg-cyan-900 rounded-full flex items-center justify-center text-blue-500 dark:text-cyan-400">
                        <FontAwesomeIcon icon={faChartLine} />
                      </div>
                    </div>
                    <div className="h-8 w-16 bg-stone-300 dark:bg-slate-600 rounded mb-1 animate-pulse"></div>
                    <div className="h-3 w-32 bg-stone-200 dark:bg-slate-700 rounded animate-pulse"></div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4">
                    Lista últimos tickets
                  </h3>
                  <div className="p-4 rounded-xl bg-white dark:bg-slate-800 shadow-sm border border-stone-200 dark:border-slate-700 w-64">
                    <section className="bg-white dark:bg-slate-900 p-2 rounded-xl">
                      <div className="mb-2 flex py-2 gap-2 items-center border-b dark:border-gray-700">
                        <div className="h-6 w-6 rounded-full bg-stone-300 dark:bg-slate-600 animate-pulse"></div>
                        <section>
                          <div className="h-4 w-40 mb-2 bg-stone-300 dark:bg-slate-600 rounded animate-pulse"></div>
                          <div className="h-2 w-40 mb-2 bg-stone-300 dark:bg-slate-600 rounded animate-pulse"></div>
                        </section>
                      </div>
                      <div className="mb-2 flex py-2 gap-2 items-center border-b dark:border-gray-700">
                        <div className="h-6 w-6 rounded-full bg-stone-300 dark:bg-slate-600 animate-pulse"></div>
                        <section>
                          <div className="h-4 w-40 mb-2 bg-stone-300 dark:bg-slate-600 rounded animate-pulse"></div>
                          <div className="h-2 w-40 mb-2 bg-stone-300 dark:bg-slate-600 rounded animate-pulse"></div>
                        </section>
                      </div>
                    </section>
                  </div>
                </div>

                {/* List Item Wireframe */}
                <div>
                  <h3 className="text-xl font-semibold mb-4">List Item</h3>
                  <div className="w-full max-w-2xl bg-white dark:bg-slate-800 border border-stone-200 dark:border-slate-700 rounded-lg p-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-full bg-stone-200 dark:bg-slate-600 shrink-0"></div>
                      <div className="space-y-2">
                        <div className="h-4 w-32 bg-stone-300 dark:bg-slate-600 rounded"></div>
                        <div className="h-3 w-20 bg-stone-200 dark:bg-slate-700 rounded"></div>
                      </div>
                    </div>
                    <div className="h-8 w-20 bg-stone-200 dark:bg-slate-700 rounded"></div>
                  </div>
                </div>

                {/* Mobile Nav Wireframe */}
                <div>
                  <h3 className="text-xl font-semibold mb-4">
                    Mobile Navigation
                  </h3>
                  <div className="w-full max-w-sm h-16 bg-white dark:bg-slate-900 border-t border-stone-200 dark:border-slate-700 flex items-center justify-around px-4">
                    <div className="flex flex-col items-center gap-1 opacity-50">
                      <div className="h-6 w-6 bg-stone-400 dark:bg-slate-500 rounded"></div>
                      <div className="h-2 w-10 bg-stone-300 dark:bg-slate-600 rounded"></div>
                    </div>
                    <div className="flex flex-col items-center gap-1 text-blue-500 dark:text-cyan-400">
                      <div className="h-6 w-6 bg-current rounded"></div>
                      <div className="h-2 w-10 bg-current rounded opacity-50"></div>
                    </div>
                    <div className="flex flex-col items-center gap-1 opacity-50">
                      <div className="h-6 w-6 bg-stone-400 dark:bg-slate-500 rounded"></div>
                      <div className="h-2 w-10 bg-stone-300 dark:bg-slate-600 rounded"></div>
                    </div>
                  </div>
                </div>

                {/* Card Skeleton */}
                {CardDashboardSkeleton()}
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}

function ColorSwatch({
  bg,
  text,
  label,
  hex,
}: {
  bg: string;
  text: string;
  label: string;
  hex: string;
}) {
  return (
    <div
      className={clsx(
        `p-4 rounded-lg shadow-sm ${bg} ${text} w-32 h-32 flex flex-col justify-between`,
        bg == "bg-slate-900" ? "border border-slate-500" : "",
      )}
    >
      <span className="font-medium">{label}</span>
      <span className="text-sm opacity-80">{hex}</span>
    </div>
  );
}
