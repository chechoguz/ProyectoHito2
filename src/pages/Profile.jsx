import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Profile = () => {
  // 🔹 Usuario de prueba para poder ver el perfil sin autenticación
  const user = {
    nombre: "Sergio",
    apellido: "Herrera",
    telefono: "+56 9 1234 5678",
    descripcion: "Amante de la programación y los memes.",
    foto: "/img/default-profile.jpg",
  };

  const [selectedFile, setSelectedFile] = useState(null);
  const [userData, setUserData] = useState({
    nombre: user.nombre,
    apellido: user.apellido,
    telefono: user.telefono,
    descripcion: user.descripcion,
    foto: user.foto,
  });

  // Manejar cambios en los inputs
  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  // Manejar cambio de foto de perfil
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUserData({ ...userData, foto: imageUrl });
      setSelectedFile(file);
    }
  };

  return (
    <div className="bg-black min-h-screen w-screen overflow-x-hidden flex flex-col text-white">
      <Navbar /> 

      {/* PERFIL CON USUARIO DE PRUEBA */}
      <div className="flex flex-grow items-center justify-center w-full px-6">
        <div className="w-full max-w-4xl bg-black p-8">
          
          {/* FOTO DE PERFIL Y NOMBRE */}
          <div className="flex items-center space-x-6">
            <img src={userData.foto} alt="Perfil" className="w-24 h-24 rounded-full border border-gray-400 object-cover" />
            <div>
              <h2 className="text-2xl font-bold">{userData.nombre} {userData.apellido}</h2>
              
              {/* CAMPO EDITABLE PARA LA DESCRIPCIÓN */}
              <textarea 
                name="descripcion"
                value={userData.descripcion}
                onChange={handleChange}
                className="w-full mt-2 p-2 bg-black text-gray-300 border border-gray-600 rounded focus:outline-none"
              />

              <input type="file" onChange={handleFileChange} className="mt-2 text-sm text-gray-300" />
            </div>
          </div>

          {/* FORMULARIO DE INFORMACIÓN PERSONAL */}
          <div className="mt-8">
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <label className="text-gray-400 text-sm">Nombre</label>
                <input type="text" name="nombre" value={userData.nombre} onChange={handleChange} className="w-full p-3 bg-black text-white border border-gray-600 focus:outline-none" />
              </div>
              <div>
                <label className="text-gray-400 text-sm">Apellido</label>
                <input type="text" name="apellido" value={userData.apellido} onChange={handleChange} className="w-full p-3 bg-black text-white border border-gray-600 focus:outline-none" />
              </div>
            </div>

            <div className="mt-4">
              <label className="text-gray-400 text-sm">Teléfono</label>
              <input type="text" name="telefono" value={userData.telefono} onChange={handleChange} className="w-full p-3 bg-black text-white border border-gray-600 focus:outline-none" />
            </div>

            <div className="flex justify-end space-x-4 mt-6">
                <button className="border border-white px-4 py-2 bg-white text-black hover:bg-black hover:text-white">Actualizar información</button>
            </div>
          </div>

        </div>
      </div>

      <Footer /> 
    </div>
  );
};

export default Profile;
