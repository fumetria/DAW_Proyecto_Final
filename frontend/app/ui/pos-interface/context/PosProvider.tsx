"use client";
import { useEffect, useState } from "react";
import { PosContext } from "./PosContext";
import { article, category, receiptLine } from "@/app/lib/types/types";
import { fetchArticlesByCategory, fetchCategoryById } from "@/app/lib/data";

export function PosProvider({ children }: { children: React.ReactNode }) {
  const apiURL =
    "https://68dc4aaa7cd1948060a9ef39.mockapi.io/api/v1/fuApi/articles";
  const [articles, setArticles] = useState<article[]>([]);
  const [reloadArticles, setReloadArticles] = useState<boolean>(false);
  const [articlesLines, setArticlesLines] = useState<receiptLine[]>([]);
  const [totalBill, setTotalBill] = useState<number>(0);
  const [articlesList, setArticlesList] = useState<article[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>();
  const [selectedArticleLine, setSelectedArticleLine] =
    useState<receiptLine | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<article | null>(null);

  /**
   * Fetch de articulos en nuestra API
   */
  useEffect(() => {
    const fetchArticles = async (categoryName: string) => {
      try {
        const res = await fetchArticlesByCategory(categoryName);
        if (res == null) throw new Error("Error al obtener datos");
        const data = res;
        setArticles(data);
      } catch (err) {
        console.error(err);
        setArticles([]);
      }
    };
    fetchArticles(selectedCategory);
  }, [selectedCategory]);
  const [localPrinterUrl, setLocalPrinterUrl] = useState(() => {
    if (localStorage.getItem("localPrinterUrl")) {
      return localStorage.getItem("localPrinterUrl");
    }
    return "http://localhost:6500";
  });
  const [isPrinterConnect, setIsPrinterConnect] = useState(false);

  useEffect(() => {
    async function isPrinterConnect() {
      try {
        const response = await fetch(localPrinterUrl + "/");
        setIsPrinterConnect(response.ok);
        // eslint-disable-next-line no-unused-vars
      } catch (e) {
        setIsPrinterConnect(false);
      }
    }

    isPrinterConnect();
  }, [localPrinterUrl]);
  // const printerURL = "http://localhost:6500";

  // useEffect(() => {
  //   const setCategory = async () => {
  //     if (articles.length > 0) {
  //       const category = await fetchCategoryById(
  //         articles[0].category.toLocaleString()
  //       );
  //       setSelectedCategory(category);
  //     }
  //   };
  //   setCategory();
  // }, [articles]);
  const handleCategorySelect = ({ category }: { category: category }) => {
    setSelectedCategory(category);
  };
  useEffect(() => {
    const updateTotalBill = () => {
      const total = articlesLines.reduce(
        (totals, articleLine) => totals + articleLine.total,
        0
      );
      setTotalBill(total);
    };
    updateTotalBill();
  }, [articlesLines, setTotalBill]);
  useEffect(() => {
    console.log("selectedArticle: ", selectedArticle);
  }, [selectedArticle]);

  const handleDeleteArticle = async (articleId: string) => {
    try {
      const res = await fetch(apiURL + `/${articleId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("No se ha actualizado correctamente");
      setReloadArticles((prevStatus) => !prevStatus);
    } catch (error) {
      console.log(error, "No se ha actualizado correctamente");
    }
  };
  useEffect(() => {
    const updateArticleList = () => {
      const aList = articles.filter(
        (article: article) =>
          article.category.toLowerCase() === selectedCategory
      );
      setArticlesList(aList);
    };
    updateArticleList();
  }, [selectedCategory, articles]);

  const handleUpdateArticleForm = (article: article) => {
    setSelectedArticle(article);
  };

  return (
    <PosContext.Provider
      value={{
        apiURL,
        articles,
        setArticles,
        reloadArticles,
        setReloadArticles,
        articlesList,
        setArticlesList,
        selectedCategory,
        setSelectedCategory,
        handleCategorySelect,
        articlesLines,
        setArticlesLines,
        totalBill,
        setTotalBill,
        selectedArticleLine,
        setSelectedArticleLine,
        handleDeleteArticle,
        handleUpdateArticleForm,
        selectedArticle,
        setSelectedArticle,
        localPrinterUrl,
        setLocalPrinterUrl,
        isPrinterConnect,
        setIsPrinterConnect,
      }}
    >
      {children}
    </PosContext.Provider>
  );
}
