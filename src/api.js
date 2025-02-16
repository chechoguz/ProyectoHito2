import axios from "axios";

const API_URL = "http://localhost:5000"; 

// Configurar Axios con la URL base
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Agregar token a cada solicitud si el usuario está autenticado
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Funciones para autenticación
export const registerUser = (userData) => api.post("/auth/register", userData);
export const loginUser = (credentials) => api.post("/auth/login", credentials);
export const fetchProfile = () => api.get("/auth/me");

// Funciones para productos
export const fetchProducts = () => api.get("/products");
export const createProduct = (productData) => api.post("/products", productData);
export const updateProduct = (id, productData) => api.put(`/products/${id}`, productData);
export const deleteProduct = (id) => api.delete(`/products/${id}`);

// Funciones para carrito de compras
export const fetchCart = () => api.get("/cart");
export const addToCart = (product) => api.post("/cart", product);
export const updateCartItem = (id, quantity) => api.put(`/cart/${id}`, { quantity });
export const removeCartItem = (id) => api.delete(`/cart/${id}`);

export default api;

