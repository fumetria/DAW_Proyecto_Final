import clsx from "clsx";

export default function Button({
  label,
  handleClick,
  categorySelect,
  btnTitle,
}) {
  return (
    <>
      <button
        type="button"
        title={btnTitle}
        className={clsx(
          `text-base font-light md:size-24 xl:size-30 xl:font-semibold uppercase shadow cursor-pointer rounded`,
          label == categorySelect
            ? "bg-blue-400 text-stone-100"
            : "bg-stone-100 text-stone-900"
        )}
        key={label}
        onClick={handleClick}
      >
        {label}
      </button>
    </>
  );
}
