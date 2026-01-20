"use client";

import Button from "./Button";
import { category } from "@/app/lib/types/types";
import { usePsGlobalContext } from "../context/PsGlobalContext";
import { useEffect } from "react";

export default function CategorySection({
  categories,
}: {
  categories: category[];
}) {
  const { selectedCategory, handleSelectedCategory } = usePsGlobalContext();

  useEffect(() => {
    if (!categories.length) return;
    if (!selectedCategory) {
      handleSelectedCategory(categories[0].name);
    }
  }, [categories, selectedCategory, handleSelectedCategory]);
  return (
    <>
      <section
        id="category-section"
        className="flex flex-wrap gap-2 overflow-auto m-2 justify-center"
      >
        {categories.length > 0 &&
          categories.map((category) => (
            <Button
              key={category.id}
              label={category.name}
              handleClick={() => handleSelectedCategory(category.name)}
              categorySelect={selectedCategory}
              btnTitle={category.name}
            />
          ))}
      </section>
    </>
  );
}
