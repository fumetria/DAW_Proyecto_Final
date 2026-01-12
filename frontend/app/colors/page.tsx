import Header from "../ui/components/Header";

export default function Page() {
  return (
    <>
      <main className="grid grid-rows-[auto_1fr] h-screen w-full">
        <Header />
        <section className="bg-stone-200 dark:bg-slate-200">
          <h2>Color Palette</h2>
          <h3>Color 1</h3>
          <div className="flex">
            <div className="p-4 bg-blue-200 text-stone-100 text-center">
              blue-200
            </div>
            <div className="p-4 bg-blue-400 text-stone-100 text-center">
              blue-400
            </div>
            <div className="p-4 bg-blue-500 text-stone-100 text-center">
              blue-500
            </div>
            <div className="p-4 bg-blue-600 text-stone-100 text-center">
              blue-600
            </div>
            <div className="p-4 bg-blue-800 text-stone-100 text-center">
              blue-800
            </div>
          </div>
          <h3>Color 2 (Light)</h3>
          <div className="flex">
            <div className="p-4 bg-stone-100 text-stone-800 text-center">
              stone-100
            </div>
            <div className="p-4 bg-stone-300 text-stone-800 text-center">
              stone-300
            </div>
            <div className="p-4 bg-stone-500 text-stone-800 text-center">
              stone-500
            </div>
            <div className="p-4 bg-stone-600 text-stone-800 text-center">
              stone-600
            </div>
            <div className="p-4 bg-stone-800 text-stone-100 text-center">
              stone-800
            </div>
          </div>
          <h3>Color 3 (dark)</h3>
          <div className="flex">
            <div className="p-4 bg-slate-400 text-slate-50 text-center">
              slate-400
            </div>
            <div className="p-4 bg-slate-500 text-slate-50 text-center">
              stsone-300
            </div>
            <div className="p-4 bg-slate-800 text-slate-50 text-center">
              stone-500
            </div>
            <div className="p-4 bg-slate-900 text-slate-50 text-center">
              stone-600
            </div>
            <div className="p-4 bg-slate-950 text-slate-50 text-center">
              stone-800
            </div>
          </div>
          <h3>Color 4</h3>
          <div className="flex">
            <div className="p-4 bg-cyan-200 text-cyan-500 text-center">
              cyan-200
            </div>
            <div className="p-4 bg-cyan-400 text-slate-50 text-center">
              cyan-400
            </div>
            <div className="p-4 bg-cyan-500 text-slate-50 text-center">
              cyan-500
            </div>
            <div className="p-4 bg-cyan-600 text-slate-50 text-center">
              cyan-600
            </div>
            <div className="p-4 bg-cyan-800 text-slate-50 text-center">
              cyan-800
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
