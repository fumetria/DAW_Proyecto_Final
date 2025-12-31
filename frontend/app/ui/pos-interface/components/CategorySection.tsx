import { useEffect, useState } from "react";
import Button from "./Button";
// import { ArticleContext } from "./context/ArticleContext";

export default function CategorySection({
  articles,
  handleCategorySelect,
  categorySelect,
}) {
  // const { selectedCategory, setSelectedCategory } = useContext(ArticleContext);
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    const createCategoryList = () => {
      setCategoryList([
        ...new Set(articles.map((article) => article.category.toLowerCase())),
      ]);
    };

    createCategoryList();
  }, [articles]);

  return (
    <>
      <section
        id="category-section"
        className="flex flex-wrap gap-2 overflow-auto m-2 justify-center"
      >
        {categoryList.length > 0 &&
          categoryList.map((category) => (
            <Button
              key={category}
              label={category}
              handleClick={() => handleCategorySelect(category)}
              categorySelect={categorySelect}
              btnTitle={category}
            />
          ))}
      </section>
    </>
  );
}
