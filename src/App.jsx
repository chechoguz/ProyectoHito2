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

const PrivateRoute = ({ element }) => {
  const { user } = useContext(AuthContext);
  return user ? element : <Navigate to="/login" />;
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
          <Route path="/createpost" element={<PrivateRoute element={<CreatePost />} />} /> 
          <Route path="/gallery" element={<PrivateRoute element={<Gallery />} />} /> 
          <Route path="/postdetail" element={<PostDetail />} />
          <Route path="/cart" element={<Cart />} /> 
        </Routes>
      </Router>
    </CartProvider>
  );
};

export default App;