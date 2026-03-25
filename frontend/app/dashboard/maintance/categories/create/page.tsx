import CreateCategoryForm from "@/app/ui/dashboard/categories/createForm";
import { robotoFlex } from "@/app/fonts";

export default async function Page() {
  return (
    <main>
      <div className="mb-5">
        <h2
          className={`${robotoFlex.className} text-2xl 2xl:text-4xl font-semibold dark:text-slate-50`}
        >
          Nueva Categoría
        </h2>
      </div>
      <CreateCategoryForm />
    </main>
  );
}
