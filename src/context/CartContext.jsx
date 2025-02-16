import { createContext, useState, useContext, useEffect } from "react";
import api from "../api";

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Cargar carrito desde localStorage al iniciar
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  // Guardar carrito en localStorage cada vez que cambia
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // **Agregar un producto al carrito localmente**
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, cantidad: item.cantidad + 1 } : item
        );
      } else {
        return [...prevCart, { ...product, cantidad: 1 }];
      }
    });
  };

  // **Actualizar la cantidad de un producto en el carrito localmente**
  const updateQuantity = (id, cantidad) => {
    if (cantidad < 1) return; // Evita cantidades negativas

    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, cantidad } : item
      )
    );
  };

  // **Eliminar un producto del carrito localmente**
  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  // **Procesar compra y actualizar la base de datos**
  const checkout = async (user) => {
    if (!user) {
      alert("Debes iniciar sesión para continuar con la compra.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("No hay token de autenticación.");
        return;
      }

      console.log("🔹 Enviando orden de compra...");

      const productosIds = cart.map((item) => ({
        productId: item.id, // Asegurar que se envía `productId`
        cantidad: item.cantidad,
      }));

      const response = await api.post(
        "/cart", // Se cambia `/orders` por `/cart`
        { productos: productosIds }, // Se envía correctamente el JSON esperado
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log("Pedido exitoso:", response.data);

      setCart([]); // Vaciar el carrito después de la compra
      localStorage.removeItem("cart"); // ✅ Limpiar carrito en localStorage
      alert("Compra realizada con éxito.");
    } catch (error) {
      console.error("Error en el checkout:", error.response?.data || error);
      alert("Error al procesar la compra.");
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, updateQuantity, removeFromCart, checkout }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;

