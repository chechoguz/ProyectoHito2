import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Gallery = () => {
  const navigate = useNavigate(); 

  // Simulación de usuario administrador
  const isAdmin = true; // Cambiar a false para probar como usuario normal

  // Datos de prueba 
  const [products, setProducts] = useState([
    {
        id: 1,
        titulo: "Meme 1",
        descripcion: "Descripción Meme 1",
        precio: 19990,
        imagen: "/img/meme1.jpg",
      },
      {
        id: 2,
        titulo: "Meme 2",
        descripcion: "Descripción Meme 2",
        precio: 24990,
        imagen: "/img/meme2.jpg",
      },
      {
        id: 3,
        titulo: "Meme 3",
        descripcion: "Descripción Meme 3",
        precio: 17990,
        imagen: "/img/meme3.jpg",
      },
      {
        id: 4,
        titulo: "Meme 4",
        descripcion: "Descripción Meme 4",
        precio: 22990,
        imagen: "/img/meme4.jpg",
      },
  ]);

  // Función para eliminar productos (solo para admin)
  const handleDelete = (id) => {
    setProducts(products.filter((product) => product.id !== id));
    alert("Producto eliminado.");
  };

  // Función para redirigir a CreatePost con los datos del producto a editar
  const handleEdit = (product) => {
    navigate("/createpost", { state: { product } });
  };

  return (
    <div className="bg-black min-h-screen w-screen overflow-x-hidden flex flex-col text-white">
      <Navbar /> 

      <div className="flex flex-grow items-center justify-center w-full px-6">
        <div className="w-full max-w-6xl bg-black p-8 rounded-lg">
          <h2 className="text-3xl font-bold mb-6 text-center">
            {isAdmin ? "Administrar Productos" : "Acceso Restringido"}
          </h2>

          {/* VERIFICAR SI EL USUARIO ES ADMIN */}
          {isAdmin ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                  <div key={product.id} className="bg-gray-900 p-4 rounded-lg shadow-lg">
                    <img src={product.imagen} alt={product.titulo} className="w-full h-48 object-cover rounded-md" />
                    <h3 className="text-lg font-bold mt-2">{product.titulo}</h3>
                    <p className="text-gray-400 text-sm">{product.descripcion}</p>
                    <p className="text-yellow-400 font-semibold mt-1">${product.precio}</p>
                    <div className="mt-3 flex space-x-2">
                      <button
                        onClick={() => handleEdit(product)}
                        className="bg-white text-black px-4 py-2 rounded hover:bg-black hover:text-white transition"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 transition"
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <p className="text-center text-red-500">No tienes permiso para acceder a esta página.</p>
          )}
        </div>
      </div>

      <Footer /> 
    </div>
  );
};

export default Gallery;
