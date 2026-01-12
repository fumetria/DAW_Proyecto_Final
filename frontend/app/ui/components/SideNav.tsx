import NavLinks2 from "./NavLinks2";

export default function SideNav() {
  return (
    <>
      <div className="flex h-full flex-col px-3 py-4 md:px-2 bg-stone-100 dark:bg-slate-800">
        <ul>
          <NavLinks2 />
        </ul>
      </div>
    </>
  );
}
