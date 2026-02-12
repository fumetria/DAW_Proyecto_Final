import {
  AddLineDetails,
  DeleteLineButton,
  FinishReceipt,
  UpdateLineQuantity,
} from "./aside-buttons";

export default function AsidePanel() {
  return (
    <>
      <div className="grid grid-rows-[auto_auto_auto_auto] md:gap-2 h-full w-full md:p-2 bg-stone-600 ">
        <div className="row-start-1 row-end-2">
          <DeleteLineButton />
        </div>
        <div className="row-start-2 row-end-3">
          <AddLineDetails />
        </div>
        <div className="row-start-3 row-end-4">
          <UpdateLineQuantity />
        </div>
        <div className="row-start-4 row-end-5">
          <FinishReceipt />
        </div>
      </div>
    </>
  );
}
