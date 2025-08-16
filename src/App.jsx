import confirmIcon from "./assets/icon-order-confirmed.svg";
import { useState } from "react";
import { data } from "../data.js";
import { v4 } from "uuid";
import Cart from "./components/Cart.jsx";
import Product from "./components/Product.jsx";

// Main App component
export default function App() {
  // State for cart items
  const [cart, setCart] = useState([]);
  // State for showing/hiding confirmation modal
  const [model, setModel] = useState(false);

  // Add uuid to each product from data
  const products = data.map((product) => ({ id: v4(), ...product }));

  // Function to add products to cart or update quantity if already exists
  function addToCart(product, quantity) {
    setCart((prev) => {
      const existingProduct = prev.find((item) => item.id === product.id);
      if (existingProduct) {
        // Update quantity if product already in cart
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: quantity } : item
        );
      }
      // Add new product to cart
      return [...prev, { ...product, quantity: quantity }];
    });
  }

  // Function to show confirmation modal
  function handleModel() {
    setModel(true);
  }

  return (
    <div
      className={`h-screen grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 relative ${
        model && "overflow-hidden"
      } `}
    >
      {/* Products section */}
      <div className="bg-amber-50 col-span-1 md:col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-1">
        <h1 className="text-5xl p-2 col-span-1 md:col-span-2 lg:col-span-3 text-orange-950 font-bold ml-4">
          Desserts
        </h1>
        {/* Render each product */}
        {products.map((product) => (
          <Product key={product.id} product={product} addToCart={addToCart} />
        ))}
      </div>
      {/* Cart section */}
      <div className="col-span-1 md:col-span-3 lg:col-span-1 bg-amber-50 p-4">
        <Cart products={cart} handleModel={handleModel} />
      </div>
      {/* Confirmation modal */}
      {model && (
        <div className="absolute inset-0 z-10 bg-black/50 h-screen w-full flex items-center justify-center">
          <div className="p-8 w-full md:max-w-1/2 bg-white rounded-2xl">
            <img src={confirmIcon} alt="confirm icon" />
            <h2 className="my-2 text-3xl font-bold">Order confirmed</h2>
            <p className="text-gray-600">we hope you enjoy your food!</p>
            <div className="my-3 p-3 rounded-2xl bg-red-50">
              {/* List ordered items */}
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between border-b-2 border-b-gray-300 p-1 md:p-3"
                >
                  <div className="left flex flex-col md:flex-row gap-2 items-start md:items-start">
                    <img src={item.image.thumbnail} alt={item.name} />
                    <div>
                      <h3 className="font-bold text-base mb-4">{item.name}</h3>
                      <span className="text-red-900 font-bold text-[1.3rem] mr-2">
                        {item.quantity}X
                      </span>
                      <span>@ ${item.price.toFixed(2)}</span>
                    </div>
                  </div>
                  <div className="right">
                    <h3 className="font-bold">
                      ${(item.price * item.quantity).toFixed(2)}
                    </h3>
                  </div>
                </div>
              ))}
              {/* Order total */}
              <div className="total flex justify-between items-center p-3">
                <h2>Order Total</h2>
                <h2 className="font-bold text-2xl">
                  $
                  {cart
                    .reduce((sum, item) => sum + item.price * item.quantity, 0)
                    .toFixed(2)}
                </h2>
              </div>
            </div>
            {/* Button to start new order */}
            <button
              className="block w-full p-3 bg-red-700 text-white rounded-3xl text-base font-bold cursor-pointer"
              onClick={() => {
                setCart([]);
                setModel(false);
              }}
            >
              Start New Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
