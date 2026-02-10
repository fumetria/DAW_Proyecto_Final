"use client";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import NavLinks from "./NavLinks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import clsx from "clsx";

export default function SideNav() {
  const [openMenu, setOpenMenu] = useState<boolean>(false);

  const showMenu = () => setOpenMenu(!openMenu);

  return (
    <>
      <div className="flex h-full flex-col px-3 py-2 md:px-2 bg-stone-100 dark:bg-slate-800">
        <div className="md:hidden">
          <div
            className="md:hidden focus-visible:ring-2"
            onClick={showMenu}
            aria-expanded={openMenu}
            aria-controls="mobile-menu"
            aria-label="Abrir Menú"
          >
            <FontAwesomeIcon
              icon={faBars}
              size="2x"
              className={clsx(
                "text-stone-800 dark:text-slate-50 transition-transform duration-300",
                openMenu && "rotate-90",
              )}
            />
          </div>
          <ul
            id="mobile-menu"
            className={clsx(
              "md:block overflow-hidden transition-all duration-300 ease-in-out",
              openMenu
                ? "max-h-96 opacity-100 translate-y-0 mt-2"
                : "max-h-0 opacity-0 -translate-y-2",
            )}
          >
            <NavLinks />
          </ul>
        </div>
        <div className="hidden md:block">
          <NavLinks />
        </div>
      </div>
    </>
  );
}
