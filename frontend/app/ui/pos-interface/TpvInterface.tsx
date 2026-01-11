"use client";

import ArticlesLineTable from "./components/ArticleLinesTable";
import ArticlesSection from "./components/ArticlesSection";
import CategorySection from "./components/CategorySection";
import { useContext } from "react";
// import ArticleLinesTableAsideBtns from "./components/ArticleLinesTableAsideBtns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleXmark,
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";
import { PosContext } from "./context/PosContext";
import AsideButton from "./components/AsideButton";
import ArticleLineUpdateForm from "./components/ArticleLineUpdateForm";
import ArticleCreateForm from "./components/ArticleCreateForm";
import TpvAside from "./components/TpvAside";

export default function TpvInterface() {
  const {
    articles,
    articlesList,
    selectedCategory,
    handleCategorySelect,
    articlesLines,
    setArticlesLines,
    totalBill,
    selectedArticleLine,
    setSelectedArticleLine,
    localPrinterUrl,
    isPrinterConnect,
  } = useContext(PosContext);

  const handleNewArticleLine = (article) => {
    setArticlesLines((prevLines) => {
      // Si el articulo ya esta en pantalla, nos dará el indice de este
      const existingIndex = prevLines.findIndex(
        (line) => line.id === article.cod_art
      );

      if (existingIndex !== -1) {
        const updatedLines = [...prevLines];
        // Accedemos al articulo usando el indice que hemos obtenido anteriormente
        const existingLine = { ...updatedLines[existingIndex] };
        // Actualizamos las cantidades y totales
        existingLine.quantity = Number(existingLine.quantity) + 1;
        existingLine.total =
          Number(existingLine.quantity) * Number(existingLine.price);
        // Actualizamos la linea y devolvemos el array actualizado para
        // que se actualize en la función setArticlesLines
        updatedLines[existingIndex] = existingLine;
        return updatedLines;
      } else {
        const newLine = {
          id: article.cod_art,
          name: article.name,
          quantity: 1,
          price: Number(article.pvp),
          total: Number(article.pvp),
        };
        return [...prevLines, newLine];
      }
    });
  };

  const handleUpdateArticleLine = ({ formData }: { formData: FormData }) => {
    setArticlesLines((prevLines) => {
      const existingIndex = prevLines.findIndex(
        (line) => line.id === formData.id
      );
      if (existingIndex != -1) {
        const updatedLines = [...prevLines];
        // Accedemos al articulo usando el indice que hemos obtenido anteriormente
        const existingLine = { ...updatedLines[existingIndex] };
        // Actualizamos las cantidades y totales
        existingLine.details = formData.details;
        existingLine.quantity = formData.quantity;
        existingLine.price = formData.price;
        existingLine.total = existingLine.quantity * existingLine.price;
        // Actualizamos la linea y devolvemos el array actualizado para
        // que se actualize en la función setArticlesLines
        updatedLines[existingIndex] = existingLine;
        return updatedLines;
      }
      return prevLines;
    });
    setSelectedArticleLine(null);
  };

  const handleSelectArticleLine = async (article) => {
    setSelectedArticleLine(article);
  };

  const handleDeleteLine = (selectedArticleLine) => {
    const newArticlesLines = articlesLines.filter(
      (articleLine) => articleLine.id != selectedArticleLine.id
    );
    setArticlesLines(newArticlesLines);
    setSelectedArticleLine(null);
  };

  return (
    <>
      <section
        id="tpv-interface"
        className="h-screen bg-stone-100 grid grid-cols-7 grid-rows-[1fr_1fr_auto_1fr_1fr_auto] text-black"
      >
        <div className="col-start-1 col-end-5 row-start-1 row-end-3 justify-start items-center pb-4 overflow-y-scroll">
          <ArticlesLineTable
            articlesLines={articlesLines}
            selectedArticleLine={selectedArticleLine}
            handleSelectArticleLine={handleSelectArticleLine}
          />
        </div>
        <div className="col-start-1 col-end-5  row-start-3 row-end-4 bg-stone-600 text-stone-100 flex justify-between text-3xl px-2 py-1 xl:py-4">
          <div className="row-start-1 row-end-2">
            <AsideButton
              label="Eliminar"
              selectedArticleLine={selectedArticleLine}
              handleDeleteLine={handleDeleteLine}
              style={"danger"}
            />
          </div>
          <h3 className="text-xl xl:text-4xl">
            Total:{" "}
            <span className="font-semibold text-xl xl:text-4xl">
              {Number(totalBill).toFixed(2).toString().replace(".", ",")}
            </span>{" "}
            €
          </h3>
        </div>
        <div className="col-start-1 col-end-3 row-start-4 row-end-6 bg-stone-300 m-2 rounded overflow-y-scroll">
          <CategorySection
            articles={articles}
            handleCategorySelect={handleCategorySelect}
            categorySelect={selectedCategory}
          />
        </div>
        {/* <div className="col-start-5 col-end-6 row-start-1 row-end-4">
          <ArticleLinesTableAsideBtns
            selectedArticleLine={selectedArticleLine}
            handleDeleteLine={handleDeleteLine}
          />
        </div> */}
        <div className="col-start-5 col-end-7 row-start-1 row-end-4 xl:row-end-3 bg-stone-300 rounded border-s border-stone-300">
          <ArticleLineUpdateForm
            selectedArticleLine={selectedArticleLine}
            handleUpdateArticleLine={handleUpdateArticleLine}
          />
        </div>
        <div className="col-start-5 col-end-7 row-start-4 xl:row-start-3 row-end-6 bg-stone-300 rounded border-s border-t border-stone-300">
          <ArticleCreateForm />
        </div>
        <div className="col-start-3 col-end-5 row-start-4 row-end-6 bg-stone-300 m-2 rounded overflow-y-scroll">
          <ArticlesSection
            articles={articlesList}
            handleNewArticleLine={handleNewArticleLine}
            handleSelectArticleLine={handleSelectArticleLine}
          />
        </div>
        <div className="bg-grey-300 col-start-7 col-end-8 row-start-1 row-end-6 bg-stone-100 py-2 flex flex-col justify-between border-s border-stone-300">
          <TpvAside />
        </div>
        <div className="row-start-6 row-end-7 bg-stone-100 col-start-1 col-end-8 border-t border-stone-300">
          <div className="flex gap-2 odd:border-e border-stone-300">
            <div className="border-e border-stone-300 px-2">
              <p>
                Usuario: <span>Usuario1</span>
              </p>
            </div>
            <div className="border-e border-stone-300 px-2">
              <p>
                Último ticket: <span>00000</span>
              </p>
            </div>
            <div className="border-e border-stone-300 px-2">
              Importe: <span>0,00</span>€
            </div>
            <div className="border-e border-stone-300 px-2">
              {localPrinterUrl}
              {isPrinterConnect ? (
                <FontAwesomeIcon
                  icon={faCircleCheck}
                  className="text-green-500"
                />
              ) : (
                <FontAwesomeIcon
                  icon={faCircleXmark}
                  className="text-red-500"
                />
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
