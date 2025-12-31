"use client";
import { useEffect, useState } from "react";
import { PosContext } from "./PosContext";
// import { useFetchArticles } from "../../hooks/useFetchArticles.jsx";
import {
  articlesTable,
  categoriesTable,
  receiptsLineTable,
} from "@/app/db/schema.js";

export function PosProvider({ children }: { children: React.ReactNode }) {
  const apiURL =
    "https://68dc4aaa7cd1948060a9ef39.mockapi.io/api/v1/fuApi/articles";
  const [articles, setArticles] = useState<(typeof articlesTable)[]>([]);
  const [reloadArticles, setReloadArticles] = useState(false);
  /**
   * Fetch de articulos en nuestra API
   */
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await fetch(apiURL);
        if (!res.ok) throw new Error("Error al obtener datos");
        const data = await res.json();
        setArticles(data);
      } catch (err) {
        console.error(err);
        setArticles([]);
      }
    };
    fetchArticles();
  }, [reloadArticles]);
  const [articlesLines, setArticlesLines] = useState<
    (typeof receiptsLineTable)[]
  >([]);
  const [totalBill, setTotalBill] = useState(0);
  const [articlesList, setArticlesList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState();
  const [selectedArticleLine, setSelectedArticleLine] = useState(null);
  const [selectedArticle, setSelectedArticle] =
    useState<typeof articlesTable>(null);
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

  useEffect(() => {
    if (articles.length > 0) {
      setSelectedCategory(articles[0].category.toLowerCase());
    }
  }, [articles]);
  const handleCategorySelect = ({
    category,
  }: {
    category: typeof categoriesTable;
  }) => {
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

  const handleDeleteArticle = async (articleId: typeof articlesTable) => {
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
        (article: typeof articlesTable) =>
          article.category.toLowerCase() === selectedCategory
      );
      setArticlesList(aList);
    };
    updateArticleList();
  }, [selectedCategory, articles]);

  const handleUpdateArticleForm = (article: typeof articlesTable) => {
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
