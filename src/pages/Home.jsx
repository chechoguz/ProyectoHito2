import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext"; 
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Home = () => {
  const navigate = useNavigate(); 
  const { addToCart } = useCart(); 

  // Datos de prueba
  const [products, setProducts] = useState([
    {
      id: 1,
      titulo: "Meme 1",
      descripcion: "Descripción Meme 1",
      precio: 19990,
      imagen: "https://pbs.twimg.com/media/FWqJ4bTX0AAHTbW.jpg:large",
    },
    {
      id: 2,
      titulo: "Meme 2",
      descripcion: "Descripción Meme 2",
      precio: 24990,
      imagen: "https://difusoribero.com/wp-content/uploads/2021/07/meme_famoso.png?w=779",
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

  // Redirigir a PostDetail con los datos del producto seleccionado
  const handleViewDetails = (product) => {
    navigate("/postdetail", { state: { product } });
  };

  // Agregar producto al carrito con alerta
  const handleAddToCart = (product) => {
    addToCart(product); // ✅ Agregar al carrito
    alert(`"${product.titulo}" ha sido agregado al carrito.`);
  };

  return (
    <div className="bg-black min-h-screen w-screen overflow-x-hidden flex flex-col text-white">
      <Navbar /> 

      {/* Banner de bienvenida */}
      <div className="bg-white text-black py-16 text-center">
        <h1 className="text-5xl font-bold">Compra lo nuevo</h1>
      </div>

      {/* Sección de productos disponibles */}
      <div className="flex flex-grow items-center justify-center w-full px-6">
        <div className="w-full max-w-6xl bg-black p-8 rounded-lg">
          <h2 className="text-3xl font-bold mb-6 text-center">Nuestros Productos</h2>

          {/* VERIFICA SI HAY PRODUCTOS */}
          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <div key={product.id} className="bg-gray-900 p-4 rounded-lg shadow-lg">
                  {/* Redirección al hacer clic en la imagen */}
                  <img
                    src={product.imagen}
                    alt={product.titulo}
                    className="w-full h-48 object-cover rounded-md cursor-pointer"
                    onClick={() => handleViewDetails(product)}
                  />
                  
                  {/* Redirección al hacer clic en el nombre */}
                  <h3
                    className="text-lg font-bold mt-2 cursor-pointer hover:text-gray-400"
                    onClick={() => handleViewDetails(product)}
                  >
                    {product.titulo}
                  </h3>

                  <p className="text-gray-400 text-sm">{product.descripcion}</p>
                  <p className="text-yellow-400 font-semibold mt-1">${product.precio}</p>

                  {/* Botón Agregar al Carrito */}
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="mt-3 w-full bg-white text-black py-2 rounded hover:bg-gray-300 transition"
                  >
                    Agregar al Carrito
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-400">No hay productos disponibles.</p>
          )}
        </div>
      </div>

      <Footer /> 
    </div>
  );
};

export default Home;
