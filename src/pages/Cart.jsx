import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Cart = () => {
  const { cart, updateQuantity, removeFromCart } = useCart();
  const navigate = useNavigate();
  const isLoggedIn = false; // Simulación de autenticación (cambiar cuando se implemente login)

  const handleCheckout = () => {
    if (!isLoggedIn) {
      alert("Debes iniciar sesión para continuar con la compra.");
      navigate("/login");
    } else {
      alert("Compra realizada con éxito!");
    }
  };

  return (
    <div className="bg-black min-h-screen w-screen flex flex-col text-white">
      <Navbar />

      <div className="w-full max-w-4xl mx-auto p-8">
        <h2 className="text-3xl font-bold mb-6">Carrito de Compras</h2>

        {cart.length > 0 ? (
          <>
            {cart.map((item) => (
              <div key={item.id} className="flex items-center justify-between bg-gray-900 p-4 mb-4 rounded-lg">
                <img src={item.imagen} alt={item.titulo} className="w-20 h-20 object-cover rounded" />
                <div className="flex-grow px-4">
                  <h3 className="text-lg font-bold">{item.titulo}</h3>
                  <p className="text-gray-400">${item.precio}</p>
                  <input type="number" min="1" value={item.cantidad}
                    onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                    className="w-16 text-black px-2 py-1"
                  />
                </div>
                <button onClick={() => removeFromCart(item.id)}
                  className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-700">
                  Eliminar
                </button>
              </div>
            ))}

            <button onClick={handleCheckout}
              className="w-full bg-white text-black py-2 rounded mt-6 hover:bg-gray-300 transition">
              Pagar
            </button>
          </>
        ) : (
          <p className="text-center text-gray-400">Tu carrito está vacío.</p>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Cart;
