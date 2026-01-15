import clsx from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function Button({ children, className, ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      className={clsx(
        (className =
          "flex items-center gap-2 py-2 px-3 rounded-xl bg-blue-500 text-stone-100 border border-blue-500 hover:bg-blue-200 hover:border-blue-500 hover:text-blue-500  dark:bg-cyan-500 dark:text-slate-50 dark:border-cyan-500 dark:hover:bg-cyan-200 dark:hover:text-cyan-500 dark:hover:border-cyan-500"),
        className
      )}
    >
      {children}
    </button>
  );
}
