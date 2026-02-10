"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { navLink } from "@/app/lib/types/navigation";
import NavLinkDropDown from "./NavLinkDropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDesktop,
  faFileInvoiceDollar,
  faHome,
  faReceipt,
  faGears,
} from "@fortawesome/free-solid-svg-icons";

const links: navLink[] = [
  { type: "link", name: "Home", href: "/dashboard", icon: faHome },
  {
    type: "link",
    name: "Tickets",
    href: "/dashboard/receipts",
    icon: faReceipt,
  },
  {
    type: "link",
    name: "Cierre caja",
    href: "/dashboard/end-day",
    icon: faFileInvoiceDollar,
  },
  {
    type: "group",
    groupName: "Mantenimiento",
    links: [
      { name: "Artículos", href: "/dashboard/maintance/articles" },
      { name: "Categorias", href: "/dashboard/maintance/categories" },
      { name: "Usuarios", href: "/dashboard/maintance/users" },
    ],
    icon: faGears,
  },
  { type: "link", name: "TPV", href: "/pos", icon: faDesktop },
];

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        if (link.type === "link" && link.name === "TPV") {
          return (
            <li key={link.name} className="mt-6" title="Acceder a TPV">
              <Link
                href={link.href}
                className="flex h-12 items-center justify-center gap-1 rounded-md bg-blue-600 p-3 text-base font-semibold text-stone-100 hover:bg-blue-200 hover:text-blue-600 dark:bg-cyan-600 dark:text-slate-50 dark:hover:bg-cyan-200 dark:hover:text-cyan-600"
              >
                <FontAwesomeIcon icon={link.icon} />
                <p className="md:block">{link.name}</p>
              </Link>
            </li>
          );
        }
        if (link.type == "link") {
          return (
            <li key={link.name}>
              <Link
                href={link.href}
                className={clsx(
                  "flex h-12 grow items-center gap-1 rounded-md  p-3 text-base font-semibold  md:flex-none md:justify-start md:p-2 md:px-3",
                  pathname === link.href
                    ? "bg-sky-100 text-blue-600 dark:bg-cyan-200 dark:text-cyan-600"
                    : "bg-stone-100 hover:bg-sky-100 hover:text-blue-600 dark:bg-slate-800 dark:text-slate-50 dark:hover:bg-cyan-100  dark:hover:text-cyan-500",
                )}
              >
                <FontAwesomeIcon icon={link.icon} />
                <p className="md:block">{link.name}</p>
              </Link>
            </li>
          );
        }
        return <NavLinkDropDown key={link.groupName} groupLinks={link} />;
      })}
    </>
  );
}
