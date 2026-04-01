"use client";

import { useState } from "react";
import Modal from "../../components/Modal";
import { usePsGlobalContext } from "../context/PsGlobalContext";
import { createReceipt } from "@/app/lib/receipts.action";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faCashRegister,
  faComment,
  faLeaf,
  faMoneyBill,
  faPen,
  faPrint,
  faTrashCan,
  faDoorOpen,
  faGear,
} from "@fortawesome/free-solid-svg-icons";
import { paymentMethod, receiptLineTable } from "@/app/lib/types/types";
import Link from "next/link";

function formatDate(d: Date | null): string {
  if (!d) return "—";
  const date = new Date(d);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${day}/${month}/${year} ${hours}:${minutes}`;
}
export function DeleteLineButton() {
  const { selectedReceiptLine, handleDeleteLine } = usePsGlobalContext();
  return (
    <button
      type="button"
      className="border border-transparent text-stone-100 bg-red-600 hover:bg-red-300 hover:text-red-600 hover:border-red-600  2xl:text-2xl font-semibold h-10 md:h-15 lg:h-20 w-full flex justify-center items-center cursor-pointer rounded"
      onClick={() => handleDeleteLine(selectedReceiptLine!)}
    >
      <section className="md:hidden">
        <FontAwesomeIcon icon={faTrashCan} />
      </section>
      <p className="hidden md:block">Eliminar</p>
    </button>
  );
}

export function UpdateLineQuantityButton() {
  const { selectedReceiptLine, handleUpdateQLine } = usePsGlobalContext();
  const [quantity, setQuantity] = useState<number>(0);

  return (
    <>
      <Modal
        selectedReceiptLine={selectedReceiptLine!}
        wLabel={"Modificar cantidad"}
        btnLabel={"Cantidad"}
        btnIcon={<FontAwesomeIcon icon={faPen} />}
        windowX={true}
        btnStyle={
          "border border-transparent text-stone-100 bg-cyan-500 hover:bg-cyan-300 hover:text-cyan-600 hover:border-cyan-600  2xl:text-2xl font-semibold h-10 md:h-15 lg:h-20 w-full flex justify-center items-center cursor-pointer rounded"
        }
      >
        {({ handleCloseModal }) => (
          <form action="" className="grid gap-2 justify-items-center">
            <input
              className="border rounded border-stone-300 ps-1 w-full"
              id="selectedLine-quantity"
              type="number"
              placeholder="Introduce cantidad"
              onChange={(e) => setQuantity(Number(e.target.value))}
              // value={quantity > 0 ? quantity : selectedReceiptLine?.quantity}
              title="Introduce cantidad"
              required={true}
              maxLength={25}
            />
            <button
              type="submit"
              className="max-w-fit bg-sky-500 hover:ring hover:bg-sky-200 hover:text-sky-600 ring-sky-500  text-stone-100 font-semibold px-2 py-1 rounded capitalize"
              onClick={() => {
                handleUpdateQLine(selectedReceiptLine!.cod_art, quantity);
                handleCloseModal();
              }}
            >
              Actualizar
            </button>
          </form>
        )}
      </Modal>
    </>
  );
}

export function AddLineDetailsButton() {
  const { selectedReceiptLine, handleAddReceiptDetails } = usePsGlobalContext();

  const [details, setDetails] = useState("");
  return (
    <>
      <Modal
        selectedReceiptLine={selectedReceiptLine!}
        wLabel={"Añadir detalles"}
        btnLabel={"Detalles"}
        btnIcon={<FontAwesomeIcon icon={faComment} />}
        windowX={true}
        btnStyle={
          "border border-transparent text-stone-100 bg-orange-500 hover:bg-orange-300 hover:text-orange-500 hover:border-orange-500  2xl:text-2xl font-semibold h-10 md:h-15 lg:h-20 w-full flex justify-center items-center cursor-pointer rounded"
        }
      >
        {({ handleCloseModal }) => (
          <form action="" className="grid gap-2 justify-items-center">
            <input
              className="border rounded border-stone-300 ps-1 w-full"
              id="selectedLine-details"
              type="text"
              placeholder="Introduce detalles"
              onChange={(e) => setDetails(e.target.value)}
              value={details!}
              title="Introduce detalles"
              required={true}
              maxLength={25}
            />
            <button
              className="max-w-fit bg-orange-500 hover:ring hover:bg-orange-200 hover:text-orange-500 ring-orange-500  text-stone-100 font-semibold px-2 py-1 rounded capitalize"
              type="submit"
              onClick={() => {
                handleAddReceiptDetails(selectedReceiptLine!.cod_art, details);
                handleCloseModal();
              }}
            >
              Actualizar
            </button>
          </form>
        )}
      </Modal>
    </>
  );
}

export function UpdateLinePriceButton() {
  const { selectedReceiptLine, handleUpdatePriceLine } = usePsGlobalContext();
  const [price, setPrice] = useState<number>(0);

  return (
    <Modal
      selectedReceiptLine={selectedReceiptLine!}
      wLabel="Modificar precio"
      btnLabel="Precio"
      btnStyle={
        "border border-transparent text-stone-100 bg-green-500 hover:bg-green-300 hover:text-green-600 hover:border-green-600  2xl:text-2xl font-semibold h-10 md:h-15 lg:h-20 w-full flex justify-center items-center cursor-pointer rounded"
      }
      btnIcon={<FontAwesomeIcon icon={faMoneyBill} />}
      windowX={true}
    >
      {({ handleCloseModal }) => (
        <form action="" className="grid gap-2 justify-items-center">
          <input
            className="border rounded border-stone-300 ps-1 w-full"
            id="selectedLine-details"
            type="number"
            placeholder="Introduce nuevo precio"
            onChange={(e) => setPrice(Number(e.target.value))}
            // value={
            //   selectedReceiptLine!.price ? selectedReceiptLine!.price : price
            // }
            title="Introduce nuevo precio"
            required={true}
            maxLength={25}
          />
          <button
            className="max-w-fit bg-orange-500 hover:ring hover:bg-orange-200 hover:text-orange-500 ring-orange-500  text-stone-100 font-semibold px-2 py-1 rounded capitalize"
            type="submit"
            onClick={() => {
              handleUpdatePriceLine(selectedReceiptLine!.cod_art, price);
              handleCloseModal();
            }}
          >
            Actualizar
          </button>
        </form>
      )}
    </Modal>
  );
}

export function FinishReceiptButton({
  paymentMethods,
}: {
  paymentMethods: paymentMethod[];
}) {
  const {
    receiptLinesTable,
    totalReceipt,
    setReceiptLinesTable,
    setSelectedReceiptLine,
    setTotalReceipt,
    setLastReceipt,
  } = usePsGlobalContext();

  const firstMethodId = Number(paymentMethods[0]?.id ?? 1);
  const [selectedPaymentMethodId, setSelectedPaymentMethodId] =
    useState<number>(firstMethodId);
  const [clientEmail, setClientEmail] = useState("");
  const [printReceipt, setPrintReceipt] = useState<boolean>(false);
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);

  const handlePrint = async ({
    receiptLinesTable,
    totalReceipt,
    createReceipt,
    openDrawer,
    printReceipt,
  }: {
    receiptLinesTable: receiptLineTable[];
    totalReceipt: number;
    createReceipt: {
      num_receipt: string;
      base_total: number;
      tax_total: number;
      total: number;
      create_at: Date;
    };
    openDrawer: boolean;
    printReceipt: boolean;
  }) => {
    await fetch("http://localhost:6500/print", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        receiptLinesTable,
        totalReceipt,
        baseTotal: createReceipt.base_total,
        taxTotal: createReceipt.tax_total,
        receiptNumber: createReceipt.num_receipt,
        receiptDate: formatDate(createReceipt.create_at),
        printReceipt,
        openDrawer,
      }),
    });
  };

  const handleFinishReceipt = async ({
    paymentMethodId,
  }: {
    paymentMethodId: number;
  }) => {
    if (!receiptLinesTable.length) return;

    try {
      const emailToSend = clientEmail.trim() || undefined;
      const res = await createReceipt(
        receiptLinesTable,
        totalReceipt,
        paymentMethodId,
        emailToSend,
      );
      if (!res) return;
      const newReceipt = res;
      setLastReceipt({
        num_receipt: res.num_receipt,
        total: res.total ?? 0,
      });
      setClientEmail("");
      if (printReceipt || openDrawer) {
        handlePrint({
          receiptLinesTable,
          totalReceipt,
          createReceipt: newReceipt,
          openDrawer,
          printReceipt,
        });
      }
      // await fetch("http://localhost:6500/print", {
      //   method: "POST",
      //   headers: { "content-type": "application/json" },
      //   body: JSON.stringify({
      //     receiptLinesTable,
      //     totalReceipt,
      //     receiptNumber: res.num_receipt,
      //     receiptDate: formatDate(res.create_at),
      //     printReceipt,
      //     openDrawer,
      //   }),
      // });

      setReceiptLinesTable([]);
      setSelectedReceiptLine(undefined);
      setTotalReceipt(0);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal
      wLabel="Finalizar ticket"
      btnLabel="Finalizar"
      btnStyle={
        "border border-transparent text-stone-100 bg-blue-500 hover:bg-blue-300 hover:text-blue-600 hover:border-blue-600  2xl:text-2xl font-semibold h-10 md:h-15 lg:h-20 w-full flex justify-center items-center cursor-pointer rounded"
      }
      btnIcon={<FontAwesomeIcon icon={faCartShopping} />}
      windowX={true}
    >
      {({ handleCloseModal }) => (
        <form
          className="grid gap-2 justify-items-center"
          onSubmit={(e) => {
            e.preventDefault();
            handleFinishReceipt({ paymentMethodId: selectedPaymentMethodId });
            handleCloseModal();
          }}
        >
          <label
            htmlFor="paymentMethod"
            className="text-sm font-medium text-stone-700 w-full"
          >
            Método de pago
          </label>
          <select
            className="border rounded border-stone-300 p-2  w-full"
            id="paymentMethod"
            value={selectedPaymentMethodId}
            onChange={(e) => setSelectedPaymentMethodId(Number(e.target.value))}
            size={1}
          >
            {paymentMethods.map((method) => (
              <option key={method.id} value={method.id} className="p-1 rounded">
                {method.name}
              </option>
            ))}
          </select>
          <label
            htmlFor="clientEmail"
            className="text-sm font-medium text-stone-700 w-full"
          >
            Enviar ticket por email(opcional)
            <FontAwesomeIcon icon={faLeaf} className="text-green-600" />
          </label>
          <input
            type="email"
            id="clientEmail"
            className="border rounded border-stone-300 focus:border-blue-500 focus:outline-blue-500 ps-1 py-1 w-full"
            placeholder="cliente@ejemplo.com"
            value={clientEmail}
            onChange={(e) => setClientEmail(e.target.value)}
          />
          <div className="w-full flex justify-start items-center gap-2">
            <input
              type="checkbox"
              id="printReceipt"
              name="printReceipt"
              className="accent-blue-500 dark:accent-cyan-600 size-6"
              checked={printReceipt}
              onChange={(e) => setPrintReceipt(e.target.checked)}
            />
            <label htmlFor="printReceipt" className="">
              Imprimir ticket en papel
            </label>
          </div>
          <div className="w-full flex justify-start items-center gap-2">
            <input
              type="checkbox"
              id="openDrawer"
              name="openDrawer"
              className="accent-blue-500 dark:accent-cyan-600 size-6"
              checked={openDrawer}
              onChange={(e) => setOpenDrawer(e.target.checked)}
            />
            <label htmlFor="printReceipt" className="">
              Abrir cajón portamendas
            </label>
          </div>
          <button
            type="submit"
            className="max-w-fit mt-2 cursor-pointer bg-blue-500 hover:ring hover:bg-blue-200 hover:text-blue-600 ring-blue-500 text-stone-100 font-semibold px-2 py-1 rounded capitalize"
          >
            Finalizar
          </button>
        </form>
      )}
    </Modal>
  );
}

export function OpenDrawerButton() {
  const handleOpenDrawer = async () => {
    await fetch("http://localhost:6500/open-drawer", {
      method: "POST",
    });
  };

  return (
    <button
      type="button"
      className="border border-transparent text-stone-100 bg-sky-400 hover:bg-sky-300 hover:text-sky-600 hover:border-sky-600  2xl:text-2xl font-semibold h-10 md:h-15 lg:h-20 w-full flex justify-center items-center cursor-pointer rounded"
      onClick={handleOpenDrawer}
    >
      <div className="md:hidden">
        <FontAwesomeIcon icon={faCashRegister} />
      </div>
      <p className="hidden md:block">Abrir cajón</p>
    </button>
  );
}

export function PrintReceipButton() {
  return (
    <button
      type="button"
      className="border border-transparent text-stone-100 bg-orange-500 hover:bg-orange-300 hover:text-orange-500 hover:border-orange-500  2xl:text-2xl font-semibold h-10 md:h-15 lg:h-20 w-full flex justify-center items-center cursor-pointer rounded"
      //   onClick={() => handleSendData(articlesLines)}
    >
      <div className="md:hidden">
        <FontAwesomeIcon icon={faPrint} />
      </div>
      <p className="hidden md:block">Imprimir</p>
    </button>
  );
}

export function PrinterSettingsButton() {
  return (
    <Modal
      wLabel={"Configuración"}
      btnLabel={"Configurar impresora"}
      btnIcon={<FontAwesomeIcon icon={faGear} size="2x" />}
      btnStyle={
        "size-12 md:px-2 md:py-1 md:size-16 xl:size-24 rounded bg-gray-500 hover:ring hover:text-gray-500 hover:bg-gray-200 ring-gray-500 text-stone-100 text-sm xl:text-base cursor-pointer"
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
            // value={newLocalPrinterUrl}
            // onChange={handleChange}
            title="Introduce ruta de impresión"
            required={true}
          />
          <button
            className="max-w-fit bg-orange-500 hover:ring hover:bg-orange-200 hover:text-orange-500 ring-orange-500  text-stone-100 font-semibold px-2 py-1 rounded capitalize"
            type="button"
            onClick={() => {
              //   handleNewPrintUrl(newLocalPrinterUrl);
              handleCloseModal();
            }}
          >
            Actualizar
          </button>
        </form>
      )}
    </Modal>
  );
}

export function ExitPosButton() {
  return (
    <Link
      title="Salir"
      href={"/dashboard"}
      className="flex justify-center items-center size-12 md:px-2 md:py-1 md:size-16 xl:size-24 rounded bg-red-700 hover:ring hover:text-red-700 hover:bg-red-200 ring-red-700 text-stone-100 text-sm xl:text-base cursor-pointer"
    >
      <FontAwesomeIcon icon={faDoorOpen} size="2x" />
      <p className="hidden md:block">Salir</p>
    </Link>
  );
}
