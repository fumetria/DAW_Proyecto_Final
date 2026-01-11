import NavLinkDropDown from "./NavLinkDropdown";
import NavLinks from "./NavLinks";

export default function SideNav() {
  return (
    <>
      <div className="flex h-full flex-col px-3 py-4 md:px-2 bg-stone-100 dark:bg-slate-800">
        <ul>
          <NavLinks />
          <NavLinkDropDown />
        </ul>
      </div>
    </>
  );
}
