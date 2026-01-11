import Header from "../ui/components/Header";
import SideNav from "../ui/components/SideNav";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="grid h-screen grid-rows-[auto_1fr]">
      <Header />
      <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
        <div className="w-full flex-none md:w-64">
          <SideNav />
        </div>
        <div className="grow overflow-y-auto p-4 md:p-6">{children}</div>
      </div>
    </main>
  );
}
