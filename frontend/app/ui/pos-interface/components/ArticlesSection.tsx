import { useContext } from "react";
import { useState, useEffect } from "react";
import { PosContext } from "../context/PosContext";
import ArticleButton from "../Article_Section/ArticleButton";

export default function ArticlesSection({
  articles,
  handleNewArticleLine,
  isSelected,
}) {
  const { handleDeleteArticle, handleUpdateArticleForm } =
    useContext(PosContext);
  const [articlesList, setArticlesList] = useState([]);
  useEffect(() => {
    setArticlesList(articles);
  }, [articles]);
  return (
    <>
      <section
        id="articles-section"
        className="flex flex-wrap gap-2 m-2 justify-start items-center"
      >
        {articlesList.length > 0 &&
          articlesList.map((article) => (
            <ArticleButton
              key={article.id}
              article={article}
              handleNewArticleLine={() => handleNewArticleLine(article)}
              isSelected={isSelected}
              handleDeleteArticle={handleDeleteArticle}
              handleUpdateArticleForm={handleUpdateArticleForm}
            />
          ))}
      </section>
    </>
  );
}
