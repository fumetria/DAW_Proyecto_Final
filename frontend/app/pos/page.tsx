import { fetchArticlesCategories, fetchLastReceipt } from "../lib/data";
import { getUserSession } from "../lib/user-session.action";
import ArticlesSection from "../ui/pos-interface/articles_section/ArticlesSection";
import CategorySection from "../ui/pos-interface/categories_section/CategorySection";
import PosAside from "../ui/pos-interface/pos-aside/PosAside";
import PosFooter from "../ui/pos-interface/pos-footer/footer";
import AsidePanel from "../ui/pos-interface/receipts_lines_section/aside-panel";
import ReceiptLinesTable from "../ui/pos-interface/receipts_lines_section/ReceiptLinesTable";
import TotalReceipt from "../ui/pos-interface/total_section/total-receipt";

export default async function Page() {
  const [categories, user, lastReceipt] = await Promise.all([
    fetchArticlesCategories(),
    getUserSession(),
    fetchLastReceipt(),
  ]);

  return (
    <section
      id="pos-interface"
      className="h-screen bg-stone-100 grid grid-cols-7 grid-rows-[1fr_1fr_auto_1fr_1fr_auto] text-black"
    >
      <div
        id="receipt-lines"
        className="col-start-1 col-end-6 row-start-1 row-end-3 justify-start items-center pb-4 overflow-y-scroll"
      >
        <ReceiptLinesTable />
      </div>
      <div
        id="total-section"
        className="col-start-1 col-end-6  row-start-3 row-end-4 bg-stone-600 text-stone-100 flex justify-end text-3xl px-2 py-1 xl:py-4"
      >
        <TotalReceipt />
      </div>
      <div
        id="categories-section"
        className="col-start-1 col-end-3 row-start-4 row-end-6 bg-stone-300 m-2 rounded overflow-y-scroll"
      >
        <CategorySection categories={categories} />
      </div>
      <div className="col-start-6 col-end-7 row-start-1 row-end-4">
        <AsidePanel />
      </div>
      {/* <div className="col-start-5 col-end-7 row-start-1 row-end-4 xl:row-end-3 bg-stone-300 rounded border-s border-stone-300"></div>
      <div className="col-start-5 col-end-7 row-start-4 xl:row-start-3 row-end-6 bg-stone-300 rounded border-s border-t border-stone-300"></div> */}
      <div
        id="articles-section"
        className="col-start-3 col-end-7 row-start-4 row-end-6 bg-stone-300 m-2 rounded overflow-y-scroll"
      >
        <ArticlesSection />
      </div>
      <div
        id="pos-right-aside"
        className="bg-grey-300 col-start-7 col-end-8 row-start-1 row-end-6 bg-stone-100 py-2 flex flex-col justify-between border-s border-stone-300"
      >
        <PosAside />
      </div>
      <div
        id="app-footer"
        className="row-start-6 row-end-7 bg-stone-100 col-start-1 col-end-8 border-t border-stone-300"
      >
        <PosFooter
          userName={user?.name ? user.name : ""}
          lReceipt={lastReceipt ? lastReceipt : { num_receipt: "", total: 0 }}
        />
      </div>
    </section>
  );
}
