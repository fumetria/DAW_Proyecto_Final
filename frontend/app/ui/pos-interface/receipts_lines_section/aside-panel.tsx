import { AddLineDetails, DeleteLineButton } from "./aside-buttons";

export default function AsidePanel() {
  return (
    <>
      <div className="grid grid-rows-[auto_auto_auto_auto] gap-2 h-full w-full p-2 bg-stone-600 rounded-e">
        <div className="row-start-1 row-end-2">
          <DeleteLineButton />
        </div>
        <div className="row-start-2 row-end-3">
          <AddLineDetails />
        </div>
        <div className="row-start-3 row-end-4"></div>
        <div className="row-start-4 row-end-5"></div>
      </div>
    </>
  );
}
