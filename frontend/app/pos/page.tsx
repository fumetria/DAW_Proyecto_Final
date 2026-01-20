import { fetchArticlesCategories } from "../lib/data";
import ArticlesSection from "../ui/pos-interface/articles_section/ArticlesSection";
import CategorySection from "../ui/pos-interface/categories_section/CategorySection";
import PosAside from "../ui/pos-interface/pos-aside/PosAside";

export default async function Page() {
  const categories = await fetchArticlesCategories();
  return (
    <section
      id="pos-interface"
      className="h-screen bg-stone-100 grid grid-cols-7 grid-rows-[1fr_1fr_auto_1fr_1fr_auto] text-black"
    >
      <div
        id="receipt-lines"
        className="col-start-1 col-end-5 row-start-1 row-end-3 justify-start items-center pb-4 overflow-y-scroll"
      ></div>
      <div className="col-start-1 col-end-5  row-start-3 row-end-4 bg-stone-600 text-stone-100 flex justify-between text-3xl px-2 py-1 xl:py-4">
        <div className="row-start-1 row-end-2"></div>
      </div>
      <div
        id="categories-section"
        className="col-start-1 col-end-3 row-start-4 row-end-6 bg-stone-300 m-2 rounded overflow-y-scroll"
      >
        <CategorySection categories={categories} />
      </div>
      <div className="col-start-5 col-end-7 row-start-1 row-end-4 xl:row-end-3 bg-stone-300 rounded border-s border-stone-300"></div>
      <div className="col-start-5 col-end-7 row-start-4 xl:row-start-3 row-end-6 bg-stone-300 rounded border-s border-t border-stone-300"></div>
      <div className="col-start-3 col-end-5 row-start-4 row-end-6 bg-stone-300 m-2 rounded overflow-y-scroll">
        <ArticlesSection />
      </div>
      <div className="bg-grey-300 col-start-7 col-end-8 row-start-1 row-end-6 bg-stone-100 py-2 flex flex-col justify-between border-s border-stone-300">
        <PosAside />
      </div>
      <div className="row-start-6 row-end-7 bg-stone-100 col-start-1 col-end-8 border-t border-stone-300"></div>
    </section>
  );
}
