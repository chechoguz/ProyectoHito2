import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const CreatePost = () => {
  const location = useLocation(); 
  const navigate = useNavigate();

  // Estado del formulario con datos por defecto o los datos del producto editado
  const [post, setPost] = useState({
    id: null,
    titulo: "",
    descripcion: "",
    precio: "",
    imagen: null,
    preview: null,
  });

  // Cargar datos si se está editando un producto
  useEffect(() => {
    if (location.state?.product) {
      const { id, titulo, descripcion, precio, imagen } = location.state.product;
      setPost({
        id,
        titulo,
        descripcion,
        precio,
        imagen: imagen,
        preview: imagen,
      });
    }
  }, [location]);

  // Manejar cambios en los inputs
  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  // Manejar cambio de imagen y mostrar vista previa
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPost({ ...post, imagen: file, preview: imageUrl });
    }
  };

  // Manejar envío del formulario (actualiza o crea un producto)
  const handleSubmit = (e) => {
    e.preventDefault();
    if (post.id) {
      alert(`Producto "${post.titulo}" actualizado correctamente.`);
    } else {
      alert(`Producto "${post.titulo}" agregado correctamente.`);
    }
    navigate("/gallery");
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
            <div>
              <label className="text-gray-400 text-sm">Título</label>
              <input
                type="text"
                name="titulo"
                value={post.titulo}
                onChange={handleChange}
                className="w-full p-3 bg-black text-white border border-gray-600 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="text-gray-400 text-sm">Descripción</label>
              <textarea
                name="descripcion"
                value={post.descripcion}
                onChange={handleChange}
                className="w-full p-3 bg-black text-white border border-gray-600 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="text-gray-400 text-sm">Precio ($)</label>
              <input
                type="number"
                name="precio"
                value={post.precio}
                onChange={handleChange}
                className="w-full p-3 bg-black text-white border border-gray-600 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="text-gray-400 text-sm">Imagen</label>
              <input type="file" accept="image/*" onChange={handleFileChange} className="w-full text-gray-300 mt-2" />
              {post.preview && <img src={post.preview} alt="Vista previa" className="mt-4 w-full max-h-60 object-cover rounded-lg border border-gray-600" />}
            </div>

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
