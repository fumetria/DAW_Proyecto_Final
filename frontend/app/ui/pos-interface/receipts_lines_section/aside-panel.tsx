import {
  AddLineDetailsButton,
  DeleteLineButton,
  UpdateLineQuantityButton,
  UpdateLinePriceButton,
  FinishReceiptButton,
  OpenDrawerButton,
  PrintReceipButton,
} from "./aside-buttons";

export default function AsidePanel() {
  return (
    <>
      <aside className="grid grid-cols-1 h-full bg-stone-600 ">
        <section className="grid grid-rows-4 p-1 gap-1 md:gap-2 md:p-2 ">
          <div className="row-start-1 row-end-2">
            <DeleteLineButton />
          </div>
          <div className="row-start-2 row-end-3">
            <AddLineDetailsButton />
          </div>
          <div className="row-start-3 row-end-4">
            <UpdateLineQuantityButton />
          </div>
          <div className="row-start-4 row-end-5">
            <UpdateLinePriceButton />
          </div>
        </section>
        <section className="grid grid-rows-3 p-1 gap-1 md:gap-2 md:p-2">
          <div className="row-start-1 row-end-2">
            <FinishReceiptButton />
          </div>
          <div className="row-start-2 row-end-3">
            <OpenDrawerButton />
          </div>
          <div className="row-start-3 row-end-4">
            <PrintReceipButton />
          </div>
        </section>
      </aside>
    </>
  );
}
