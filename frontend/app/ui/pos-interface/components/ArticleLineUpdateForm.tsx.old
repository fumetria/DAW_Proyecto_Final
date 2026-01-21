import { useEffect, useState } from "react";

export default function ArticleLineUpdateForm({
  selectedArticleLine,
  handleUpdateArticleLine,
}) {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    details: "",
    quantity: "",
    price: "",
  });

  useEffect(() => {
    const updateFormData = () => {
      if (selectedArticleLine) {
        setFormData(selectedArticleLine);
      } else {
        setFormData({
          id: "",
          name: "",
          details: "",
          quantity: "",
          price: "",
        });
      }
    };

    updateFormData();
  }, [selectedArticleLine]);

  const handleChange = (event) => {
    const { id, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  return (
    <>
      <div className="bg-stone-100 h-full grid justify-items-center py-2  border-stone-300 px-2">
        <form action="">
          <h2 className="capitalize font-bold text-sm md:text-base xl:text-2xl text-center mb-2">
            Actualización Lineas
          </h2>
          <div className="grid">
            <label htmlFor="details" className="font-semibold uppercase">
              Nombre Articulo
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              className="bg-stone-300 border rounded w-36 lg:w-60 xl:w-96 lg:py-1 ps-3 uppercase"
              disabled={true}
            />
          </div>
          <div className="grid">
            <label htmlFor="details" className="font-semibold uppercase">
              Detalles
            </label>
            <input
              type="text"
              id="details"
              name="details"
              value={formData.details}
              className="bg-stone-300 border rounded w-36 lg:w-60 xl:w-96 lg:py-1 ps-3 uppercase"
              onChange={handleChange}
            />
          </div>
          <div className="grid">
            <label htmlFor="quantity" className="font-semibold uppercase">
              Cantidad
            </label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={formData.quantity}
              className="bg-stone-300 border rounded w-36 lg:w-60 xl:w-96 lg:py-1 ps-3 uppercase"
              onChange={handleChange}
            />
          </div>
          <div className="grid">
            <label htmlFor="price" className="font-semibold uppercase">
              Precio
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              className="bg-stone-300 border rounded w-36 lg:w-60 xl:w-96 lg:py-1 ps-3 uppercase"
              onChange={handleChange}
            />
          </div>
          <div className="grid justify-items-center my-1 ">
            <button
              type="button"
              className="xl:text-xl bg-blue-400 hover:ring hover:bg-blue-200 hover:text-blue-400 ring-blue-400 text-stone-100 font-semibold px-2 py-1 rounded"
              onClick={() => handleUpdateArticleLine(formData)}
            >
              Actualizar
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
