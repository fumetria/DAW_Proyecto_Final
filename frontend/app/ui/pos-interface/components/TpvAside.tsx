"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDoorOpen,
  faPrint,
  faCashRegister,
  faGear,
} from "@fortawesome/free-solid-svg-icons";
import { useContext, useState } from "react";
import { PosContext } from "../context/PosContext";
import Modal from "./Modal";
import ClientLogo from "./ClientLogo";
import ClientTitle from "./ClientTitle";
import Link from "next/link";

export default function TpvAside() {
  const { totalBill, articlesLines, localPrinterUrl, setLocalPrinterUrl } =
    useContext(PosContext);
  const [newLocalPrinterUrl, setNewLocalPrinterUrl] = useState("");

  const handleNewPrintUrl = () => {
    if (newLocalPrinterUrl == "") {
      return;
    }
    setLocalPrinterUrl(newLocalPrinterUrl);
    localStorage.setItem("localPrinterUrl", newLocalPrinterUrl);
    console.log(localStorage.getItem("localPrinterUrl"));
    setNewLocalPrinterUrl("");
  };

  const handleChange = (event) => {
    const newUrl = event.target.value;
    if (newUrl == "") {
      return;
    }
    setNewLocalPrinterUrl(newUrl);
  };
  const handleSendData = async (articlesLines) => {
    const res = await fetch(localPrinterUrl + "/print", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ articlesLines, totalBill }),
    });
    if (res.ok) {
      //   setClearArticlesLines((prev) => !prev);
    }
  };

  const handleOpenDrawer = async () => {
    await fetch(localPrinterUrl + "/open-drawer", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({}),
    }).then((res) => {
      if (res.ok) {
        console.log("¿Funcionó?");
      }
    });
  };

  return (
    <>
      <div className="flex flex-col justify-center justify-items-center items-center">
        <ClientLogo />
        <ClientTitle />
      </div>
      <div className="grid xl:grid-cols-2 justify-items-center gap-1 xl:gap-2">
        <button
          type="button"
          className="flex flex-col justify-center items-center px-2 py-1 size-20 xl:size-28 rounded bg-blue-400 hover:ring hover:text-blue-400 hover:bg-blue-200 ring-blue-400 text-stone-100 text-sm xl:text-base cursor-pointer"
          onClick={handleOpenDrawer}
        >
          <FontAwesomeIcon icon={faCashRegister} size="2x" />
          Abrir cajón
        </button>
        <button
          type="button"
          className="px-2 py-1 size-20 xl:size-28 rounded bg-orange-500 hover:ring hover:text-orange-500 hover:bg-orange-200 ring-orange-500 text-stone-100 text-sm xl:text-base cursor-pointer"
          onClick={() => handleSendData(articlesLines)}
        >
          <FontAwesomeIcon icon={faPrint} size="2x" />
          Imprimir
        </button>
        <Modal
          wLabel={"Puerto impresión"}
          btnLabel={"Configurar impresora"}
          btnIcon={<FontAwesomeIcon icon={faGear} size="2x" />}
          btnStyle={
            "px-2 py-1 size-20 xl:size-28 rounded bg-gray-500 hover:ring hover:text-gray-500 hover:bg-gray-200 ring-gray-500 text-stone-100 text-sm xl:text-base cursor-pointer"
          }
          windowX={true}
        >
          {({ handleCloseModal }) => (
            <form action="" className="grid gap-2 justify-items-center">
              <input
                className="border rounded border-stone-300 ps-1 w-full"
                id="printer_url"
                type="text"
                placeholder="Introduce ruta de impresión"
                value={newLocalPrinterUrl}
                onChange={handleChange}
                title="Introduce ruta de impresión"
                required={true}
              />
              <button
                className="max-w-fit bg-orange-500 hover:ring hover:bg-orange-200 hover:text-orange-500 ring-orange-500  text-stone-100 font-semibold px-2 py-1 rounded capitalize"
                type="button"
                onClick={() => {
                  handleNewPrintUrl(newLocalPrinterUrl);
                  handleCloseModal();
                }}
              >
                Actualizar
              </button>
            </form>
          )}
        </Modal>
        <Link
          href={"/dashboard"}
          className="flex justify-center items-center px-2 py-1 size-20 xl:size-28 rounded bg-red-700 hover:ring hover:text-red-700 hover:bg-red-200 ring-red-700 text-stone-100 text-sm xl:text-base cursor-pointer"
        >
          <FontAwesomeIcon icon={faDoorOpen} size="2x" />
          <p>Salir</p>
        </Link>
      </div>
    </>
  );
}
