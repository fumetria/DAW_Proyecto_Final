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
  faMoneyBill,
  faPen,
  faPrint,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { paymentMethod } from "@/app/lib/types/types";

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

// export function FinishReceiptButton({
//   paymentMethods,
// }: {
//   paymentMethods: paymentMethod[];
// }) {
//   const {
//     receiptLinesTable,
//     totalReceipt,
//     setReceiptLinesTable,
//     setSelectedReceiptLine,
//     setTotalReceipt,
//     setLastReceipt,
//   } = usePsGlobalContext();

//   const handeleFinishReceipt = async () => {
//     if (!receiptLinesTable.length) return;

//     try {
//       const res = await createReceipt(receiptLinesTable, totalReceipt, 1);
//       if (res != null) {
//         setLastReceipt({
//           num_receipt: res.num_receipt,
//           total: res.total ?? 0,
//         });
//       }

//       setReceiptLinesTable([]);
//       setSelectedReceiptLine(undefined);
//       setTotalReceipt(0);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <button
//       type="button"
//       className="border border-transparent text-stone-100 bg-blue-500 hover:bg-blue-300 hover:text-blue-600 hover:border-blue-600  2xl:text-2xl font-semibold h-10 md:h-15 lg:h-20 w-full flex justify-center items-center cursor-pointer rounded"
//       onClick={() => handeleFinishReceipt()}
//     >
//       <section className="md:hidden">
//         <FontAwesomeIcon icon={faCartShopping} />
//       </section>
//       <p className="hidden md:block">Finalizar</p>
//     </button>
//   );
// }

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

  const firstMethodId = paymentMethods[0]?.id ?? 1;
  const [selectedPaymentMethodId, setSelectedPaymentMethodId] = useState<number>(firstMethodId);

  const handleFinishReceipt = async (paymentMethodId: number) => {
    if (!receiptLinesTable.length) return;

    try {
      const res = await createReceipt(receiptLinesTable, totalReceipt, paymentMethodId);
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
            handleFinishReceipt(selectedPaymentMethodId);
            handleCloseModal();
          }}
        >
          <label htmlFor="paymentMethod" className="text-sm font-medium text-stone-700 w-full">
            Método de pago
          </label>
          <select
            className="border rounded border-stone-300 ps-1 w-full"
            id="paymentMethod"
            value={selectedPaymentMethodId}
            onChange={(e) => setSelectedPaymentMethodId(Number(e.target.value))}
          >
            {paymentMethods.map((method) => (
              <option key={method.id} value={method.id}>
                {method.name}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="max-w-fit bg-blue-500 hover:ring hover:bg-blue-200 hover:text-blue-600 ring-blue-500 text-stone-100 font-semibold px-2 py-1 rounded capitalize"
          >
            Finalizar
          </button>
        </form>
      )}
    </Modal>
  );
}

export function OpenDrawerButton() {
  return (
    <button
      type="button"
      className="border border-transparent text-stone-100 bg-sky-400 hover:bg-sky-300 hover:text-sky-600 hover:border-sky-600  2xl:text-2xl font-semibold h-10 md:h-15 lg:h-20 w-full flex justify-center items-center cursor-pointer rounded"
      //   onClick={handleOpenDrawer}
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
