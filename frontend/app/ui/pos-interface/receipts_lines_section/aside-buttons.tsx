"use client";

import { useState } from "react";
import Modal from "../../components/Modal";
import { usePsGlobalContext } from "../context/PsGlobalContext";
import { createReceipt } from "@/app/lib/receipts.action";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faComment,
  faPen,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";

export function DeleteLineButton() {
  const { selectedReceiptLine, handleDeleteLine } = usePsGlobalContext();
  return (
    <button
      type="button"
      className="border border-transparent text-stone-100 bg-red-600 hover:bg-red-300 hover:text-red-600 hover:border-red-600  2xl:text-2xl font-semibold size-12 md:h-full md:w-full flex justify-center items-center cursor-pointer rounded"
      onClick={() => handleDeleteLine(selectedReceiptLine!)}
    >
      <section className="md:hidden">
        <FontAwesomeIcon icon={faTrashCan} />
      </section>
      <p className="hidden md:block">Eliminar</p>
    </button>
  );
}

export function UpdateLineQuantity() {
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
          "border border-transparent text-stone-100 bg-green-500 hover:bg-green-300 hover:text-green-500 hover:border-green-500  2xl:text-2xl font-semibold size-12 md:h-full md:w-full flex justify-center items-center cursor-pointer rounded"
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
              value={quantity > 0 ? quantity : selectedReceiptLine?.quantity}
              title="Introduce cantidad"
              required={true}
              maxLength={25}
            />
            <button
              type="submit"
              className="max-w-fit bg-green-500 hover:ring hover:bg-green-200 hover:text-green-500 ring-green-500  text-stone-100 font-semibold px-2 py-1 rounded capitalize"
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

export function AddLineDetails() {
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
          "border border-transparent text-stone-100 bg-orange-500 hover:bg-orange-300 hover:text-orange-500 hover:border-orange-500  2xl:text-2xl font-semibold size-12 md:h-full md:w-full flex justify-center items-center cursor-pointer rounded"
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

export function FinishReceipt() {
  const {
    receiptLinesTable,
    totalReceipt,
    setReceiptLinesTable,
    setSelectedReceiptLine,
    setTotalReceipt,
    setLastReceipt,
  } = usePsGlobalContext();

  const handeleFinishReceipt = async () => {
    if (!receiptLinesTable.length) return;

    try {
      const res = await createReceipt(receiptLinesTable, totalReceipt);
      if (res != null) {
        setLastReceipt({
          num_receipt: res.num_receipt,
          total: res.total ?? 0,
        });
      }

      setReceiptLinesTable([]);
      setSelectedReceiptLine(undefined);
      setTotalReceipt(0);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <button
      type="button"
      className="border border-transparent text-stone-100 bg-blue-500 hover:bg-blue-300 hover:text-blue-600 hover:border-blue-600  2xl:text-2xl font-semibold size-12 md:h-full md:w-full flex justify-center items-center cursor-pointer rounded"
      onClick={() => handeleFinishReceipt()}
    >
      <section className="md:hidden">
        <FontAwesomeIcon icon={faCartShopping} />
      </section>
      <p className="hidden md:block">Finalizar</p>
    </button>
  );
}
