import PsGlobalProvider from "../ui/pos-interface/context/PsGlobalProvider";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <PsGlobalProvider>
      <main className="h-screen w-full">{children}</main>
    </PsGlobalProvider>
  );
}
