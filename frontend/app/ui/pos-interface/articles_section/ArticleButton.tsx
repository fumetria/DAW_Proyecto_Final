import { article } from "@/app/lib/types/types";

export default function ArticleButton({ article }: { article: article }) {
  return (
    <>
      <div
        key={article.id}
        title={article.name}
        className="grid grid_rows_5 bg-stone-100 size-20 md:size-24 xl:size-30 cursor-pointer rounded shadow"
      >
        <div
          className="row-start-2 row-end-6 flex flex-col"
          // onClick={() => handleNewArticleLine(article)}
        >
          <h3 className="text-base xl:text-3xl text-center font-semibold text-red-600">
            {article.cod_art}
          </h3>
          <p className="uppercase text-wrap text-sm text-center text-blue-950">
            {article.name}
          </p>
        </div>
      </div>
    </>
  );
}
