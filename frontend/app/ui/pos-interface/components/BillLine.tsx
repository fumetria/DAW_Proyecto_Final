export default function BillLine({
  article,
  handleSelectArticleLine,
  isSelected,
}) {
  return (
    <>
      <tr
        className={
          isSelected
            ? "bg-blue-400 text-stone-100 cursor-pointer"
            : "text-blue-900 cursor-pointer"
        }
        key={article.id}
        onClick={() => handleSelectArticleLine(article)}
      >
        <td className="text-center">{article.id}</td>
        <td className="uppercase">{article.name}</td>
        <td className="uppercase">{article.details}</td>
        <td className="text-center">{article.quantity}</td>
        <td className="text-center">
          {Number(article.price).toFixed(2).toString().replace(".", ",")}
        </td>
        <td className="text-center">
          {Number(article.total).toFixed(2).toString().replace(".", ",")}
        </td>
      </tr>
    </>
  );
}
