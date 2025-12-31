import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ArticleButton({
  article,
  handleNewArticleLine,
  handleDeleteArticle,
  handleUpdateArticleForm,
}) {
  return (
    <>
      <div
        key={article.id}
        title={article.name}
        className="grid grid_rows_5 bg-stone-100 size-20 md:size-24 xl:size-30 cursor-pointer rounded shadow"
      >
        <div className="row-start-1 row-end-2 flex justify-between items-start px-1">
          <div onClick={() => handleUpdateArticleForm(article)}>
            <FontAwesomeIcon
              icon={faPencil}
              size="xs"
              className="text-stone-500 hover:text-stone-300"
            />
          </div>
          <div
            className="text-end text-sm text-red-800 hover:text-red-500"
            onClick={() => handleDeleteArticle(article.id)}
          >
            X
          </div>
        </div>
        <div
          className="row-start-2 row-end-6 flex flex-col"
          onClick={() => handleNewArticleLine(article)}
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
