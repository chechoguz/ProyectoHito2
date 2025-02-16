import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext"; 
import api from "../api"; 
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Home = () => {
  const navigate = useNavigate(); 
  const { addToCart } = useCart(); 
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Obtener productos desde el backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await api.get("/products");
        setProducts(data);
      } catch (error) {
        setError("Error al cargar los productos");
        console.error("Error al obtener productos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Redirigir a PostDetail con los datos del producto seleccionado
  const handleViewDetails = (product) => {
    navigate("/postdetail", { state: { product } });
  };

  // Agregar producto al carrito con verificación de autenticación
  const handleAddToCart = async (product) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Debes iniciar sesión para agregar productos al carrito.");
        navigate("/login");
        return;
      }

      await addToCart(product);
      alert(`"${product.titulo}" ha sido agregado al carrito.`);
    } catch (error) {
      console.error("Error al agregar al carrito:", error);
      alert("Error al agregar el producto al carrito.");
    }
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

          {/* Mostrar error si falla la carga */}
          {error && <p className="text-center text-red-500">{error}</p>}

          {/* Mostrar mensaje de carga mientras se obtienen los productos */}
          {loading ? (
            <p className="text-center text-gray-400">Cargando productos...</p>
          ) : products.length > 0 ? (
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
