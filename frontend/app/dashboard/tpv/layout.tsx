import { PosProvider } from "@/app/ui/pos-interface/context/PosProvider";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <PosProvider>
      <main className="">
        <div>{children}</div>
      </main>
    </PosProvider>
  );
}
