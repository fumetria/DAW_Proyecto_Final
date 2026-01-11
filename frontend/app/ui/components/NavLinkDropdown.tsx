"use client";

import Link from "next/link";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FlipProp, RotateProp } from "@fortawesome/fontawesome-svg-core";

const maintanceLinks = [
  { name: "Artículos", href: "/maintances/articles" },
  { name: "Usuarios", href: "/maintance/users" },
];

export default function NavLinkDropDown() {
  const [openLink, setOpenLink] = useState<boolean>(false);
  const [arrowDir, setArrowDir] = useState<number>(0);
  return (
    <>
      <li
        className="flex h-12 grow items-center justify-between gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 dark:bg-slate-800 dark:text-slate-50 dark:hover:bg-cyan-100  dark:hover:text-cyan-500 md:p-2 md:px-3"
        onClick={() => {
          setOpenLink(!openLink);
          setArrowDir(arrowDir == 0 ? 90 : 0);
        }}
      >
        <p>Mantenimiento</p>
        <FontAwesomeIcon
          icon={faArrowRight}
          size="1x"
          pull="right"
          transform={{ rotate: arrowDir }}
        />
      </li>
      <li className={openLink ? "" : "hidden"}>
        <ul>
          {maintanceLinks.map((link) => {
            return (
              <li
                key={link.name}
                className=" bg-gray-50 ps-6 py-1 text-sm font-base hover:bg-sky-100 hover:text-blue-600 dark:bg-slate-800 dark:text-slate-50 dark:hover:bg-cyan-100  dark:hover:text-cyan-500"
              >
                <Link href={link.href}>
                  <p className="hidden md:block">{link.name}</p>
                </Link>
              </li>
            );
          })}
        </ul>
      </li>
    </>
  );
}
