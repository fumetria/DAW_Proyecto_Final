import SideNav from "../ui/components/SideNav";
import AppFooter from "../ui/dashboard/components/footer";
import HeaderApp from "../ui/dashboard/components/Header-app";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="grid h-screen grid-rows-[auto_1fr_auto]">
      <HeaderApp />
      <div className="flex flex-col md:flex-row md:overflow-hidden">
        <div className="w-full flex-none md:w-64">
          <SideNav />
        </div>
        <div className="grow overflow-y-auto p-4 md:p-6">{children}</div>
      </div>
      <AppFooter />
    </main>
  );
}
