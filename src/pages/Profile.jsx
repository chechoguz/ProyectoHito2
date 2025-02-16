import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Profile = () => {
  const { user, setUser } = useContext(AuthContext);
  const [userData, setUserData] = useState({
    nombre: "",
    apellido: "",
    telefono: "",
    descripcion: "",
    foto: "",
  });
  const [message, setMessage] = useState("");

  // Obtener datos del perfil desde el backend
  useEffect(() => {
    const fetchProfile = async () => {
      try {
          const { data } = await api.get("/auth/me");
          setUserData({
              nombre: data.nombre || "",
              apellido: data.apellido || "",
              telefono: data.telefono || "",
              descripcion: data.descripcion || "",
              foto: data.imagen || "/img/default-profile.jpg",
          });
      } catch (error) {
          console.error("Error al obtener el perfil:", error.response?.data || error);
      }
  };

  fetchProfile();

    fetchProfile();
  }, []);

  // Manejar cambios en los inputs
  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  // Actualizar información del perfil en el backend
const handleUpdateProfile = async () => {
  try {
      const { data } = await api.put("/auth/update", userData);
      
      // Obtener el usuario actual desde localStorage
      const storedUser = JSON.parse(localStorage.getItem("user")) || {};

      // Mantener el token y solo actualizar los datos del perfil
      const updatedUser = { ...storedUser, ...data };

      // Guardamos los datos actualizados en el contexto y en localStorage
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));

      setMessage("Perfil actualizado correctamente.");
  } catch (error) {
      setMessage("Error al actualizar el perfil.");
      console.error("Error al actualizar perfil:", error.response?.data || error);
  }
};


  return (
    <div className="bg-black min-h-screen w-screen overflow-x-hidden flex flex-col text-white">
      <Navbar />

      <div className="flex flex-grow items-center justify-center w-full px-6">
        <div className="w-full max-w-4xl bg-black p-8">
          {/* FOTO DE PERFIL Y NOMBRE */}
          <div className="flex items-center space-x-6">
            <img
              src={userData.foto}
              alt="Perfil"
              className="w-24 h-24 rounded-full border border-gray-400 object-cover"
            />
            <div>
              <h2 className="text-2xl font-bold">{userData.nombre} {userData.apellido}</h2>

              {/* CAMPO EDITABLE PARA LA DESCRIPCIÓN */}
              <textarea
                name="descripcion"
                value={userData.descripcion}
                onChange={handleChange}
                className="w-full mt-2 p-2 bg-black text-gray-300 border border-gray-600 rounded focus:outline-none"
              />

              {/* Input para URL de la imagen de perfil */}
              <input
                type="text"
                name="foto"
                placeholder="URL de la imagen de perfil"
                value={userData.foto}
                onChange={handleChange}
                className="mt-2 w-full p-3 bg-black text-white border border-gray-600 focus:outline-none"
              />
            </div>
          </div>

          {/* FORMULARIO DE INFORMACIÓN PERSONAL */}
          <div className="mt-8">
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <label className="text-gray-400 text-sm">Nombre</label>
                <input
                  type="text"
                  name="nombre"
                  value={userData.nombre}
                  onChange={handleChange}
                  className="w-full p-3 bg-black text-white border border-gray-600 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-gray-400 text-sm">Apellido</label>
                <input
                  type="text"
                  name="apellido"
                  value={userData.apellido}
                  onChange={handleChange}
                  className="w-full p-3 bg-black text-white border border-gray-600 focus:outline-none"
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="text-gray-400 text-sm">Teléfono</label>
              <input
                type="text"
                name="telefono"
                value={userData.telefono}
                onChange={handleChange}
                className="w-full p-3 bg-black text-white border border-gray-600 focus:outline-none"
              />
            </div>

            {/* Mostrar mensaje de éxito o error */}
            {message && <p className="text-center text-yellow-400 mt-4">{message}</p>}

            <div className="flex justify-end space-x-4 mt-6">
              <button
                onClick={handleUpdateProfile}
                className="border border-white px-4 py-2 bg-white text-black hover:bg-black hover:text-white"
              >
                Actualizar información
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Profile;
