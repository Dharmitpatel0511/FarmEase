import { useNavigate } from "react-router-dom";
import axios from "axios";

const ProductBox = ({ product }) => {

  const navigate = useNavigate()

  const onProfile = (e) => {
    navigate(`/profile?username=${encodeURIComponent(product.owner.username)}`)
  }

  const cartHandler = (e) => {
    let self = e.target
    self.classList.add('scale-125')
    setTimeout(() => {
      self.classList.remove('scale-125')
    }, 40)
    axios.post(`${import.meta.env.VITE_BACKEND_API}/product/addtocart`, {productId: product._id}, {
      withCredentials: true
    })
    .then((res) => {
      console.log(res)
    })
    .catch((err) => {
      console.log(err)
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 hover:shadow-xl transition w-64">
      {/* Product Image */}
      <div className="relative">
        <img
          src={product.photo}
          alt={product.name}
          className="w-full h-40 object-cover rounded-md"
        />
        {/* Category Badge */}
        <span className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
          {product.category}
        </span>
      </div>

      {/* Product Info */}
      <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
      <p className="text-sm text-gray-600">{product.description}</p>

      {/* Region Tag */}
      <span className="text-xs text-blue-500">{product.region}</span>

      {/* Price & Add Button */}
      <div className=" mt-2 flex justify-between items-center">
        <span onClick={cartHandler} className="   text-lg font-bold text-green-600">₹{product.price}</span>
        <button onClick={cartHandler} className="bg-green-500 cursor-pointer ease-linear duration-[40] text-white px-4 py-2 rounded hover:bg-green-600 transition">
          Add
        </button>
      </div>

      {/* Owner Details */}
      <div className="flex items-center mt-4 border-t pt-2 cursor-pointer" onClick = {onProfile}>
        <img
          src={product.owner.avatar}
          alt={product.owner.username}
          className="w-8 h-8 rounded-full border"
        />
        <span className="ml-2 text-sm font-semibold">{product.owner.username}</span>
      </div>
    </div>
  );
};

export default ProductBox;
