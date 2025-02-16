import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext"; 
import api from "../api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Gallery = () => {
  const navigate = useNavigate(); 
  const { user } = useContext(AuthContext); 
  const isAdmin = user?.rol === "admin"; 
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

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

  // Eliminar producto en el backend (solo admin)
  const handleDelete = async (id) => {
    try {
        const token = localStorage.getItem("token"); // Obtener el token del usuario autenticado
        await api.delete(`/products/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`, // Enviar token de autenticación
            },
        });

        setProducts(products.filter((product) => product.id !== id));
        alert("Producto eliminado correctamente.");
    } catch (error) {
        console.error("Error al eliminar producto:", error.response?.data || error);
        alert("Error al eliminar el producto.");
    }
};

  // Redirigir a CreatePost con los datos del producto a editar
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

          {/* Mostrar error si falla la carga */}
          {error && <p className="text-center text-red-500">{error}</p>}

          {/* Mostrar mensaje de carga mientras se obtienen los productos */}
          {loading ? (
            <p className="text-center text-gray-400">Cargando productos...</p>
          ) : isAdmin ? (
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

