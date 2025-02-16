import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../api"; // Conexión al backend
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const CreatePost = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [post, setPost] = useState({
    id: null,
    titulo: "",
    descripcion: "",
    precio: "",
    imagen: "",
  });

  useEffect(() => {
    if (location.state?.product) {
      const { id, titulo, descripcion, precio, imagen } = location.state.product;
      setPost({
        id,
        titulo,
        descripcion,
        precio,
        imagen,
      });
    }
  }, [location]);

  // Enviar formulario al backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (post.id) {
        await api.put(`/products/${post.id}`, post);
        alert(`Producto "${post.titulo}" actualizado correctamente.`);
      } else {
        await api.post("/products", post);
        alert(`Producto "${post.titulo}" agregado correctamente.`);
      }
      navigate("/gallery");
    } catch (error) {
      console.error("Error al procesar la solicitud:", error);
      alert("Error al procesar la solicitud.");
    }
  };

  return (
    <div className="bg-black min-h-screen w-screen overflow-x-hidden flex flex-col text-white">
      <Navbar />
      <div className="flex flex-grow items-center justify-center w-full px-6">
        <div className="w-full max-w-3xl bg-black p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold mb-6 text-center">
            {post.id ? "Editar Publicación" : "Crear Nueva Publicación"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input type="text" name="titulo" placeholder="Título" value={post.titulo} onChange={(e) => setPost({ ...post, titulo: e.target.value })} className="w-full p-3 bg-black text-white border border-gray-600 focus:outline-none" required />
            <textarea name="descripcion" placeholder="Descripción" value={post.descripcion} onChange={(e) => setPost({ ...post, descripcion: e.target.value })} className="w-full p-3 bg-black text-white border border-gray-600 focus:outline-none" required />
            <input type="number" name="precio" placeholder="Precio" value={post.precio} onChange={(e) => setPost({ ...post, precio: e.target.value })} className="w-full p-3 bg-black text-white border border-gray-600 focus:outline-none" required />

            {/* Input para URL de la imagen */}
            <input
              type="text"
              name="imagen"
              placeholder="URL de la imagen"
              value={post.imagen}
              onChange={(e) => setPost({ ...post, imagen: e.target.value })}
              className="w-full p-3 bg-black text-white border border-gray-600 focus:outline-none"
              required
            />

            {/* Vista previa de la imagen */}
            {post.imagen && <img src={post.imagen} alt="Vista previa" className="mt-4 w-full max-h-60 object-contain bg-black" />}

            <button type="submit" className="mt-6 w-full bg-white text-black py-2 rounded hover:bg-gray-300 transition">
              {post.id ? "Actualizar Publicación" : "Publicar"}
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CreatePost;