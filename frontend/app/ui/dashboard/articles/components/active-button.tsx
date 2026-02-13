"use client";

import type { ArticleRow } from "@/app/lib/types/dashboard-tables";
import { toggleArticleActive } from "@/app/lib/actions";

interface IsActiveArticleProps {
  article: ArticleRow;
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
        className="h-5 w-5 cursor-pointer accent-blue-600 dark:accent-cyan-600"
      />
    </form>
  );
}
