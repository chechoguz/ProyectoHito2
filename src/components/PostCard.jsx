import { Link } from "react-router-dom";

const PostCard = ({ id, titulo, descripcion, precio, imagen }) => {
  return (
    <div className="border rounded-lg p-4 shadow-md bg-white">
      <img src={imagen} alt={titulo} className="w-full h-40 object-cover rounded-md" />
      <h3 className="text-lg font-bold mt-2">{titulo}</h3>
      <p className="text-gray-700 text-sm">{descripcion}</p>
      <p className="text-blue-500 font-bold mt-1">${precio}</p>
      <Link to={`/post/${id}`} className="block text-center bg-blue-500 text-white mt-3 p-2 rounded-md">
        Ver más
      </Link>
    </div>
  );
};

export default PostCard;
