"use client";
import { article } from "@/app/lib/types/types";
import { usePsGlobalContext } from "../context/PsGlobalContext";

export default function ArticleButton({ article }: { article: article }) {
  const { handleNewReceiptLine } = usePsGlobalContext();

  return (
    <>
      <div
        key={article.id}
        title={article.name}
        className="grid grid-rows-5 items-center bg-stone-100 size-20 md:size-24 xl:size-30 cursor-pointer rounded shadow"
        onClick={() => handleNewReceiptLine(article)}
      >
        <h3 className="row-span-2 text-base xl:text-3xl text-center font-semibold text-red-600">
          {article.cod_art}
        </h3>
        <p className="row-span-3 uppercase text-wrap text-sm text-center text-blue-950">
          {article.name}
        </p>
      </div>
    </>
  );
}
