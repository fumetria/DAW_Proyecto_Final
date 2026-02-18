import { getUserRole } from "../lib/login.action";
import SideNav from "../ui/components/SideNav";
import AppFooter from "../ui/dashboard/components/footer";
import HeaderApp from "../ui/dashboard/components/Header-app";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const role = await getUserRole();
  return (
    <main className="grid h-screen grid-rows-[auto_1fr_auto]">
      <HeaderApp />
      {/* TODO: Hay que crear el menu segun el rol del usuario desde el layout.
       - bloquear rutas segun el rol del usuario. */}

      <div className="flex flex-col md:flex-row md:overflow-hidden">
        {role === "admin" && (
          <>
            <div className="w-full flex-none md:w-64">
              <SideNav />
            </div>
            <div className="grow overflow-y-auto p-2 md:p-4">{children}</div>
          </>
        )}
        {role === "user" && (
          <div className="grow overflow-y-auto p-4 md:p-6">{children}</div>
        )}
        {/* <div className="w-full flex-none md:w-64">
          <SideNav />
        </div>
        <div className="grow overflow-y-auto p-4 md:p-6">{children}</div> */}
      </div>
      <AppFooter />
    </main>
  );
}
