import { receiptLineTable } from "@/app/lib/types/types";

export default function ReceiptLine({
  receiptLine,
}: {
  receiptLine: receiptLineTable;
}) {
  return (
    <>
      <tr
        // className={
        //   isSelected
        //     ? "bg-blue-400 text-stone-100 cursor-pointer"
        //     : "text-blue-900 cursor-pointer"
        // }
        key={receiptLine.cod_art}
        // onClick={() => handleSelectArticleLine(article)}
      >
        <td className="text-center">{receiptLine.cod_art}</td>
        <td className="uppercase">{receiptLine.name}</td>
        <td className="uppercase">{receiptLine.details}</td>
        <td className="text-center">{receiptLine.quantity}</td>
        <td className="text-center">
          {Number(receiptLine.price).toFixed(2).toString().replace(".", ",")}
        </td>
        <td className="text-center">
          {Number(receiptLine.total).toFixed(2).toString().replace(".", ",")}
        </td>
      </tr>
    </>
  );
}
