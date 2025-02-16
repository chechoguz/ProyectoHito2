import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { FaShoppingCart } from "react-icons/fa";

const Navbar = () => {
  const { user, setUser, logout } = useContext(AuthContext);
  const { cart } = useCart();

  return (
    <nav className="bg-black text-white flex justify-between items-center px-8 py-4 w-full">
      {/* Logo */}
      <h1 className="text-2xl font-bold">MEMES STORE</h1>

      {/* Menú de navegación */}
      <div className="flex space-x-6 items-center">
        <Link to="/" className="text-white hover:text-gray-300 transition">Inicio</Link>

        {user ? (
          <>
            <Link to="/profile" className="text-white hover:text-gray-300 transition">Perfil</Link>

            {/* Solo los administradores pueden ver "Galería" */}
            {user.rol === "admin" && (
              <Link to="/gallery" className="text-white hover:text-gray-300 transition">Galería</Link>
            )}

            {user.rol === "admin" && (
              <Link to="/createpost" className="text-white hover:text-gray-300 transition">Publicar</Link>
            )}

            <button
              onClick={logout}
              className="bg-black text-white px-3 py-1 rounded text-sm hover:bg-white hover:text-black transition"
            >
              Cerrar Sesión
            </button>
          </>
        ) : (
          <>
            <Link to="/register" className="text-white hover:text-gray-300 transition">Regístrate</Link>
            <Link to="/login" className="text-white hover:text-gray-300 transition">Inicio de Sesión</Link>
          </>
        )}

        {/* Ícono del carrito */}
        <Link to="/cart" className="relative">
          <FaShoppingCart className="text-white text-2xl hover:text-gray-400" />
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {cart.length}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;

