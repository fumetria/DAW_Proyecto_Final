"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { navLink } from "@/app/lib/types/navigation";
import NavLinkDropDown2 from "./NavLinkDropdown2";

const links: navLink[] = [
  { type: "link", name: "Home", href: "/dashboard" },
  { type: "link", name: "Receipts", href: "/dashboard/receipts" },
  { type: "link", name: "EoD", href: "/dashboard/end-day" },
  {
    type: "group",
    groupName: "Maintance",
    links: [
      { name: "Articles", href: "/dashboard/maintance/articles" },
      { name: "Categories", href: "/dashboard/maintance/categories" },
      { name: "Users", href: "/dashboard/maintance/users" },
    ],
  },
  { type: "link", name: "TPV", href: "/tpv" },
];

export default function NavLinks2() {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        if (link.type === "link" && link.name === "TPV") {
          return (
            <li key={link.name} className="mt-6" title="Acceder a TPV">
              <Link
                href={link.href}
                className="flex h-12 items-center justify-center rounded-md bg-blue-600 p-3 text-sm font-semibold text-stone-100 hover:bg-blue-200 hover:text-blue-600 dark:bg-cyan-600 dark:text-slate-50 dark:hover:bg-cyan-200 dark:hover:text-cyan-600"
              >
                <p className="hidden md:block">{link.name}</p>
              </Link>
            </li>
          );
        }
        if (link.type == "link") {
          return (
            <>
              <li key={link.name}>
                <Link
                  href={link.href}
                  className={clsx(
                    "flex h-12 grow items-center justify-center gap-2 rounded-md  p-3 text-sm font-semibold  md:flex-none md:justify-start md:p-2 md:px-3",
                    pathname === link.href
                      ? "bg-sky-100 text-blue-600 dark:bg-cyan-100 dark:text-cyan-600"
                      : "bg-stone-100 hover:bg-sky-100 hover:text-blue-600 dark:bg-slate-800 dark:text-slate-50 dark:hover:bg-cyan-100  dark:hover:text-cyan-500"
                  )}
                >
                  <p className="hidden md:block">{link.name}</p>
                </Link>
              </li>
            </>
          );
        }
        return <NavLinkDropDown2 key={link.groupName} groupLinks={link} />;
      })}
    </>
  );
}
