import Modal from "../../components/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDoorOpen, faGear } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

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
