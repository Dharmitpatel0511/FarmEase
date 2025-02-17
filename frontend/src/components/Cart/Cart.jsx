import React, { useState, useEffect } from "react";
import axios from 'axios'

const Cart = () => {
  const [cart, setCart] = useState([])
  const [total, setTotal] = useState(0)

  useEffect(() => {
    setTotal(cart.reduce((acc, cur) => acc + cur.product.price*cur.quantity, 0))
  }, [cart])

  useEffect(() => {
    axios.post(`${import.meta.env.VITE_BACKEND_API}/product/getcart`,{}, {
        withCredentials: true
    })
    .then((res) => {
        setCart(res.data.cart)
    })
    .catch((err) => {
        console.log(err.message)
    })
  }, []);

  const incrementQuantity = (id) => {
    axios.post(`${import.meta.env.VITE_BACKEND_API}/product/addtocart`, {productId:id}, {
        withCredentials: true
    })
    .then((res) => {
        setCart((cart) => cart.map((item) => (item.product._id===id) ? ({...item, quantity:item.quantity+1}) : item))
    })
    .catch((err) => {
        console.log(err.message)
    })
  };

  // Decrease quantity
  const decrementQuantity = (id) => {
    axios.post(`${import.meta.env.VITE_BACKEND_API}/product/removefromcart`, {productId:id}, {
        withCredentials: true
    })
    .then((res) => {
        setCart((cart) => cart.map((item) => item.product._id===id ? ({...item, quantity:item.quantity-1}) : item).filter((item) => item.quantity>0))
    })
    .catch((err) => {
        console.log(err.message)
    })
  };

  // Remove item from cart
  const removeItem = (id) => {
    axios.post(`${import.meta.env.VITE_BACKEND_API}/product/deletefromcart`, {productId:id}, {
        withCredentials: true
    })
    .then((res) => {
        setCart((cart) => cart.map((item) => item.product._id===id ? {...item, quantity:-1} : item).filter((item) => item.quantity!==-1))
    })
    .catch((err) => {
        console.log(err)
    })
  };

  const buyHandler = (e) => {
    
  }


  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>

      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          {cart.map(({product, quantity}) => (
            <div key={product._id} className="flex items-center gap-4 border-b pb-4 mb-4">
              <img src={product.photo} alt={product.name} className="w-24 h-24 object-cover rounded-md" />
              <div className="flex-1">
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="text-gray-500">Price: ₹{product.price}</p>
                <p className="text-gray-500">{product.category} - {product.region}</p>

                <div className="flex items-center gap-2 mt-2">
                  <button 
                    onClick={() => decrementQuantity(product._id)} 
                    className="bg-gray-300 px-2 py-1 rounded"
                  > - </button>

                  <span>{quantity}</span>

                  <button 
                    onClick={() => incrementQuantity(product._id)} 
                    className="bg-gray-300 px-2 py-1 rounded"
                  > + </button>
                </div>

                <button 
                  onClick={() => removeItem(product._id)} 
                  className="text-red-500 mt-2"
                >Remove</button>
              </div>
            </div>
          ))}

          <div className="text-right font-bold text-lg">
            Total: ₹{total}
          </div>

          <button onClick={buyHandler} className="bg-yellow-500 text-white px-4 py-2 rounded mt-4">
            Proceed to Buy
          </button>
        </>
      )}
    </div>
  );
};

export default Cart