"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { navLink } from "@/app/lib/types/navigation";
import clsx from "clsx";
import { usePathname } from "next/navigation";

export default function NavLinkDropDown({
  groupLinks,
}: {
  groupLinks: Extract<navLink, { type: "group" }>;
}) {
  const pathname = usePathname();

  const [openLink, setOpenLink] = useState<boolean>(false);
  useEffect(() => {
    const isActiveLink = () => {
      const currentPath = groupLinks.links.some((link) => {
        return pathname.startsWith(link.href);
      });
      setOpenLink(currentPath);
    };
    isActiveLink();
  }, [pathname, groupLinks.links]);

  return (
    <>
      <li
        className="flex h-12 grow items-center justify-between gap-2 rounded-md bg-stone-100 p-3 text-sm font-semibold hover:bg-sky-100 hover:text-blue-600 dark:bg-slate-800 dark:text-slate-50 dark:hover:bg-cyan-100  dark:hover:text-cyan-500 md:p-2 md:px-3 cursor-pointer"
        onClick={() => {
          setOpenLink(!openLink);
        }}
      >
        <div className="flex gap-1">
          <FontAwesomeIcon icon={groupLinks.icon} />
          <p>{groupLinks.groupName}</p>
        </div>

        <FontAwesomeIcon
          icon={faArrowRight}
          size="1x"
          pull="right"
          transform={{ rotate: openLink ? 90 : 0 }}
        />
      </li>
      <li className={openLink ? "" : "hidden"}>
        <ul>
          {groupLinks.links.map((link) => {
            return (
              <li
                key={link.name}
                className={clsx(
                  "bg-gray-50 ps-6 py-1 text-sm font-base hover:bg-sky-100 hover:text-blue-600 dark:hover:bg-cyan-100  dark:hover:text-cyan-500",
                  pathname === link.href
                    ? "bg-sky-100 text-blue-600 dark:bg-cyan-100 dark:text-cyan-600 font-semibold"
                    : "bg-stone-100 hover:bg-sky-100 hover:text-blue-600 dark:bg-slate-800 dark:text-slate-50 dark:hover:bg-cyan-100  dark:hover:text-cyan-500",
                )}
              >
                <Link href={link.href}>
                  <p className="text-sm md:text-base">{link.name}</p>
                </Link>
              </li>
            );
          })}
        </ul>
      </li>
    </>
  );
}
