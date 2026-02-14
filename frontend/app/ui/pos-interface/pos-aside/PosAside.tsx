"use client";

import ClientLogo from "../components/ClientLogo";
import ClientTitle from "../components/ClientTitle";
import { PrinterSettingsButton, ExitPosButton } from "./components/buttons";

export default function PosAside() {
  return (
    <>
      <div className="flex flex-col justify-center justify-items-center items-center">
        <ClientLogo />
        <ClientTitle />
      </div>
      <div className="grid xl:grid-cols-2 justify-items-center gap-1 xl:gap-2">
        <PrinterSettingsButton />
        <ExitPosButton />
      </div>
    </>
  );
}
