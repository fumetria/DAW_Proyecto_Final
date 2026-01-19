"use client";

import { article, category, receiptLine } from "@/app/lib/types/types";
import { createContext } from "react";
import { useContext } from "react";

interface PosContextType {
  articles: article[];
  setArticles: React.Dispatch<React.SetStateAction<article[]>>;
  reloadArticles: boolean;
  setReloadArticles: React.Dispatch<React.SetStateAction<boolean>>;
  articlesList: article[];
  setArticlesList: React.Dispatch<React.SetStateAction<article[]>>;
  selectedCategory: category | undefined;
  setSelectedCategory: React.Dispatch<
    React.SetStateAction<category | undefined>
  >;
  handleCategorySelect: (params: { category: category }) => void;
  articlesLines: receiptLine[];
  setArticlesLines: React.Dispatch<React.SetStateAction<receiptLine[]>>;
  totalBill: number;
  setTotalBill: React.Dispatch<React.SetStateAction<number>>;
  selectedArticleLine: receiptLine | undefined;
  setSelectedArticleLine: React.Dispatch<React.SetStateAction<receiptLine>>;
  handleDeleteArticle: (articleId: article) => Promise<void>;
  handleUpdateArticleForm: (article: article) => void;
  selectedArticle: article | null;
  setSelectedArticle: React.Dispatch<React.SetStateAction<article | null>>;
  localPrinterUrl: string;
  setLocalPrinterUrl: React.Dispatch<React.SetStateAction<string>>;
  isPrinterConnect: boolean;
  setIsPrinterConnect: React.Dispatch<React.SetStateAction<boolean>>;
}

export const PosContext = createContext<PosContextType | undefined>(undefined);

export function usePosContext() {
  const context = useContext(PosContext);
  if (!context) {
    throw new Error("usePosContext debe usarse dentro de PosProvider");
  }
  return context;
}
