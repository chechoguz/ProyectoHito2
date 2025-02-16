import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext"; 
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import CreatePost from "./pages/CreatePost";
import Gallery from "./pages/Gallery";
import PostDetail from "./pages/PostDetail";
import Cart from "./pages/Cart"; 

// Rutas privadas
const PrivateRoute = ({ element, roles }) => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (roles && !roles.includes(user.rol)) {
    return <Navigate to="/" />;
  }

  return element;
};

const App = () => {
  return (
    <CartProvider> 
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<PrivateRoute element={<Profile />} />} /> 
          <Route path="/postdetail" element={<PostDetail />} />
          <Route path="/cart" element={<Cart />} /> 

          {/* Rutas exclusivas para administradores */}
          <Route path="/createpost" element={<PrivateRoute element={<CreatePost />} roles={["admin"]} />} /> 
          <Route path="/gallery" element={<PrivateRoute element={<Gallery />} roles={["admin"]} />} /> 
        </Routes>
      </Router>
    </CartProvider>
  );
};

export default App;
