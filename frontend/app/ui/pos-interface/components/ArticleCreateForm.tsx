import { useEffect, useState, useContext } from "react";
import { PosContext } from "../context/PosContext";

export default function ArticleCreateForm() {
  const [erroMsg, setErrorMsg] = useState("");
  const [formData, setFormData] = useState({
    cod_art: "",
    name: "",
    category: "",
    pvp: "",
  });

  const { apiURL, reloadArticles, setReloadArticles, selectedArticle } =
    useContext(PosContext);

  useEffect(() => {
    const updateFormData = () => {
      if (selectedArticle) {
        setFormData({
          id: selectedArticle.id,
          cod_art: selectedArticle.cod_art,
          name: selectedArticle.name,
          category: selectedArticle.category,
          pvp: selectedArticle.pvp,
        });
      } else {
        setFormData({
          cod_art: "",
          name: "",
          category: "",
          pvp: "",
        });
      }
    };

    updateFormData();
  }, [selectedArticle]);

  const handleChange = (event) => {
    const { id, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleCreateArticle = async (newArticle) => {
    try {
      await fetch(apiURL, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(newArticle),
      });
      setFormData({ cod_art: "", name: "", category: "", pvp: "" });
      setReloadArticles(!reloadArticles);
    } catch (error) {
      setErrorMsg(`Error al crear pelicula: ${error} `);
    }
  };

  const handleUpdateArticle = async () => {
    try {
      await fetch(apiURL + `/${formData.id}`, {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(formData),
      });
      setFormData({ cod_art: "", name: "", category: "", pvp: "" });
      setReloadArticles(!reloadArticles);
    } catch (error) {
      console.log("Error al actualizar. ", error);
    }
  };

  return (
    <>
      <div className="bg-stone-100 h-full grid justify-items-center py-2  border-stone-300 px-2">
        <form action="" className="xl:mx-4">
          <h2 className="capitalize font-bold text-sm md:text-base xl:text-2xl text-center mb-2">
            Mantenimiento Articulos
          </h2>
          <div className="grid">
            <label
              htmlFor="cod_art"
              className="font-semibold uppercase text-sm md:text-base"
            >
              código articulo
            </label>
            <input
              type="text"
              id="cod_art"
              name="cod_art"
              value={formData.cod_art}
              className="bg-stone-300 border rounded w-36 lg:w-60 xl:w-96 lg:py-1 ps-3"
              onChange={handleChange}
            />
          </div>
          <div className="grid">
            <label htmlFor="name" className="font-semibold uppercase">
              Nombre Articulo
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              className="bg-stone-300 border rounded w-36 lg:w-60 xl:w-96 lg:py-1 ps-3"
              onChange={handleChange}
            />
          </div>
          <div className="grid">
            <label htmlFor="category" className="font-semibold uppercase">
              Categoria
            </label>
            <input
              type="text"
              id="category"
              name="category"
              value={formData.category}
              className="bg-stone-300 border rounded w-36 lg:w-60 xl:w-96 lg:py-1 ps-3"
              onChange={handleChange}
            />
          </div>
          <div className="grid">
            <label htmlFor="pvp" className="font-semibold uppercase">
              Precio
            </label>
            <input
              type="number"
              id="pvp"
              name="pvp"
              value={formData.pvp}
              className="bg-stone-300 border rounded w-36 lg:w-60 xl:w-96 lg:py-1 ps-3"
              onChange={handleChange}
              min={0}
            />
          </div>
          <div className="grid justify-items-center mt-4 ">
            <button
              type="button"
              className="xl:text-xl bg-blue-400 hover:ring hover:bg-blue-200 hover:text-blue-400 ring-blue-400  text-stone-100 font-semibold px-2 py-1 rounded capitalize"
              onClick={() => handleCreateArticle(formData)}
              title="Nuevo articulo"
              hidden={formData.id ? true : false}
            >
              crear
            </button>
            <button
              type="button"
              className="xl:text-xl bg-orange-500 hover:ring hover:bg-orange-200 hover:text-orange-500 ring-orange-500  text-stone-100 font-semibold px-2 py-1 rounded capitalize"
              onClick={() => handleUpdateArticle(formData)}
              title="Actualizar articulo"
              hidden={formData.id ? false : true}
            >
              actualizar
            </button>
            <p className="text-red-600 text-xs">
              {erroMsg.length > 0 ? erroMsg : ""}
            </p>
          </div>
        </form>
      </div>
    </>
  );
}
