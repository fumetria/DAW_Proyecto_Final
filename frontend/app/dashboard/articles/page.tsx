import ArticlesTable from "@/app/ui/dashboard/articles/table";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard Articles",
};

export default function Page() {
  return (
    <>
      <ArticlesTable />
    </>
  );
}
