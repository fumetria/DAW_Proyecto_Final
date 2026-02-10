"use client";

import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <section className="relative ps-2 flex flex-1 shrink-0 rounded-xl shadow-lg bg-stone-100 dark:shadow-none dark:border-2 dark:border-slate-800 dark:bg-slate-900 items-center focus-within:outline-2 outline-blue-500 dark:outline-cyan-500">
      <FontAwesomeIcon
        icon={faMagnifyingGlass}
        className="dark:text-slate-50"
        size="xl"
      />
      {/* <label htmlFor="search" className="sr-only">
        Search
      </label> */}
      <input
        className="peer block w-full rounded-md border-none py-2.25 ps-2 text-sm outline-0 placeholder:text-stone-800 dark:text-slate-50 dark:placeholder:text-slate-50 dark:focus:border-cyan-500"
        placeholder={placeholder}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        defaultValue={searchParams.get("query")?.toString()}
      />
    </section>
  );
}
