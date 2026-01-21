export default function AsideButton({
  label,
  selectedArticleLine,
  handleDeleteLine,
  style,
}) {
  const styles = {
    primary:
      "bg-stone-300 text-stone-100 2xl:text-2xl font-semibold h-full w-full flex justify-center items-center cursor-pointer rounded",
    secondary:
      "bg-stone-300 text-stone-100 2xl:text-2xl font-semibold h-full w-full flex justify-center items-center cursor-pointer rounded",
    danger:
      "bg-red-600 text-stone-100 hover:ring hover:bg-red-300 hover:text-red-600 ring-red-600 text-base px-1 3xl:text-2xl font-semibold h-full w-full flex justify-center items-center cursor-pointer rounded",
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
