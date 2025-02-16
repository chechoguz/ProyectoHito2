import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext"; 
import Navbar from "../components/Navbar"; 
import Footer from "../components/Footer"; 

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); 

    if (!form.email || !form.password) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    const response = await login(form.email, form.password);
    
    if (response.success) {
      alert("Inicio de sesión exitoso");
      navigate("/profile"); 
    } else {
      setError(response.message);
    }
  };

  return (
    <div className="bg-black min-h-screen w-screen overflow-x-hidden flex flex-col">
      <Navbar /> 

      {/* CONTENEDOR PRINCIPAL */}
      <div className="flex flex-grow items-center justify-center w-full">
        <div className="w-full max-w-md bg-black p-8">
          <h2 className="text-white text-4xl font-bold mb-6 text-center">Iniciar Sesión</h2>

          {/* FORMULARIO */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              className="w-full p-3 bg-black text-white border-b border-gray-500 focus:outline-none"
            />
            <input
              type="password"
              name="password"
              placeholder="Contraseña"
              onChange={handleChange}
              className="w-full p-3 bg-black text-white border-b border-gray-500 focus:outline-none"
            />

            <button
              type="submit"
              className="w-full py-3 border border-white text-black rounded-md hover:bg-black hover:text-white transition focus:outline-none focus:ring-0 focus:border-none"
            >
              Iniciar Sesión
            </button>
          </form>

          {/* ENLACE A REGISTRO */}
          <p className="text-gray-400 mt-4 text-center">
            ¿No tienes una cuenta?{" "}
            <Link to="/register" className="text-white font-bold hover:underline">Regístrate</Link>
          </p>

          {/* MENSAJE DE ERROR */}
          {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
        </div>
      </div>

      <Footer /> 
    </div>
  );
};

export default Login;
