function AsideButton({ label, selectedArticleLine, handleDeleteLine, style }) {
  const styles = {
    primary:
      "bg-stone-300 text-stone-100 2xl:text-2xl font-semibold h-full w-full flex justify-center items-center cursor-pointer rounded",
    secondary:
      "bg-stone-300 text-stone-100 2xl:text-2xl font-semibold h-full w-full flex justify-center items-center cursor-pointer rounded",
    danger:
      "bg-red-600 text-stone-100 2xl:text-2xl font-semibold h-full w-full flex justify-center items-center cursor-pointer rounded",
  };
  return (
    <>
      <div
        className={
          styles[style]
            ? styles[style]
            : "bg-stone-300 text-stone-100 2xl:text-2xl font-semibold h-full w-full flex justify-center items-center cursor-pointer rounded"
        }
        onClick={() => handleDeleteLine(selectedArticleLine)}
      >
        {label}
      </div>
    </>
  );
}

export default function ArticleLinesTableAsideBtns({
  selectedArticleLine,
  handleDeleteLine,
}) {
  return (
    <>
      <div className="grid grid-rows-[auto_auto_auto_auto] gap-2 h-full w-full p-2 bg-stone-600 rounded-e">
        <div className="row-start-1 row-end-2">
          <AsideButton
            label="Eliminar"
            selectedArticleLine={selectedArticleLine}
            handleDeleteLine={handleDeleteLine}
            style={"danger"}
          />
        </div>
        <div className="row-start-2 row-end-3">
          <AsideButton label="Descripción" />
        </div>
        <div className="row-start-3 row-end-4">
          <AsideButton label="Detalle" />
        </div>
        <div className="row-start-4 row-end-5">
          <AsideButton label="Precio" />
        </div>
      </div>
    </>
  );
}
