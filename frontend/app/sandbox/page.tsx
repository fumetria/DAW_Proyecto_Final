import Header from "../ui/components/Header";
import SideNav from "../ui/components/SideNav";

export default function Page() {
  return (
    <>
      <main className="grid h-screen grid-rows-[auto_1fr]">
        <Header />
        <section className="flex overflow-hidden">
          <aside className="w-full flex-none md:w-64">
            <SideNav />
          </aside>
          <section></section>
        </section>
      </main>
    </>
  );
}
