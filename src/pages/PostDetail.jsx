import { useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext"; 
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const PostDetail = () => {
  const location = useLocation();
  const { product } = location.state || {};
  const { addToCart } = useCart(); 

  if (!product) {
    return (
      <div className="text-center text-white">
        <h2 className="text-2xl font-bold">Producto no encontrado</h2>
      </div>
    );
  }

  // Manejar la acción de agregar al carrito
  const handleAddToCart = () => {
    addToCart(product); 
    alert(`"${product.titulo}" ha sido agregado al carrito.`);
  };

  return (
    <div className="bg-black min-h-screen w-screen flex flex-col text-white">
      <Navbar /> 

      <div className="flex flex-grow items-center justify-center w-full px-6">
        <div className="w-full max-w-3xl bg-black p-8 rounded-lg shadow-lg">
          <div className="flex flex-col items-center">
            {/* Imagen del producto */}
            <div className="w-full h-96 bg-black flex items-center justify-center">
              <img
                src={product.imagen}
                alt={product.titulo}
                className="max-h-full max-w-full object-contain bg-black"
              />
            </div>

            {/* Información del producto */}
            <div className="w-full mt-6 text-left">
              <h2 className="text-3xl font-bold">{product.titulo}</h2>
              <p className="text-gray-400 mt-2">{product.descripcion}</p>
              <p className="text-yellow-400 font-semibold mt-2 text-xl">${product.precio}</p>

              {/* Botón de agregar al carrito */}
              <button
                onClick={handleAddToCart}
                className="mt-4 w-full bg-white text-black py-3 rounded-md hover:bg-gray-300 transition"
              >
                Agregar al Carrito
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer /> 
    </div>
  );
};

export default PostDetail;

