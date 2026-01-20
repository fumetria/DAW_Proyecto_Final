"use client";

import { useEffect, useState } from "react";
import { article } from "@/app/lib/types/types";
import ArticleButton from "./ArticleButton";
import { usePsGlobalContext } from "../context/PsGlobalContext";
import { fetchArticlesByCategory } from "@/app/lib/data";

export default function ArticlesSection() {
  const { selectedCategory } = usePsGlobalContext();
  const [articles, setArticles] = useState<article[]>([]);

  useEffect(() => {
    if (!selectedCategory) return;
    async function getArticles() {
      const data = await fetchArticlesByCategory(selectedCategory);
      setArticles(data);
    }

    getArticles();
  }, [selectedCategory]);
  return (
    <>
      <section
        id="articles-section"
        className="flex flex-wrap gap-2 m-2 justify-start items-center"
      >
        {articles.length > 0 &&
          articles?.map((article) => (
            <ArticleButton key={article.id} article={article} />
          ))}
      </section>
    </>
  );
}
