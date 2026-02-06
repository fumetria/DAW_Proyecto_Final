"use client";

import { articlesView } from "@/app/lib/types/types";
import { toggleArticleActive } from "@/app/lib/actions";

interface IsActiveArticleProps {
  article: articlesView;
}

export default function IsActiveArticle({ article }: IsActiveArticleProps) {
  return (
    <form action={toggleArticleActive}>
      <input type="hidden" name="articleId" value={article.articleID} />
      <input
        type="checkbox"
        name="isActive"
        defaultChecked={!!article.articleIsActive}
        onChange={(e) => e.currentTarget.form?.requestSubmit()}
        className="h-5 w-5 cursor-pointer accent-blue-600 dark:accent-cyan-500"
      />
    </form>
  );
}
