import { createContext, useState, useEffect } from "react";
import { registerUser, loginUser, fetchProfile } from "../api"; // ✅ Importamos las funciones desde api.js

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Obtener datos del usuario autenticado
  useEffect(() => {
    const getProfile = async () => {
      try {
          await fetchProfile(); // Llama la función directamente
      } catch (error) {
          console.error("Error al obtener perfil:", error.response?.data || error);
      }
  };

    const token = localStorage.getItem("token");
    if (token) getProfile();
  }, []);

  // Función para iniciar sesión
  const login = async (email, password) => {
    try {
      const { data } = await loginUser({ email, password });
      localStorage.setItem("token", data.token);
      setUser(data.user);
      return { success: true };
    } catch (error) {
      return { success: false, message: error.response?.data?.error || "Error al iniciar sesión" };
    }
  };

  // Función para registrar usuario
  const register = async (nombre, apellido, email, password, descripcion, imagen) => {
    try {
      await registerUser({ nombre, apellido, email, password, descripcion, imagen });
      return { success: true };
    } catch (error) {
      return { success: false, message: error.response?.data?.error || "Error al registrar usuario" };
    }
  };

  // Función para cerrar sesión
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
