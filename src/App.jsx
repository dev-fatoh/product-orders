import { useState } from "react";
import { data } from "../data.js";
import { v4 } from "uuid";
import Cart from "./components/Cart.jsx";
import Product from "./components/Product.jsx";
import Model from "./components/Model.jsx";

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
          item.id === product.id ? { ...item, quantity: quantity } : item,
        );
      }
      console.log(cart);
      // Add new product to cart
      return [...prev, { ...product, quantity: quantity }];
    });
  }

  // Function to show confirmation modal
  function handleModel() {
    setModel(true);
  }
  function resetOrder() {
    setCart([]);
    setModel(false);
  }

  return (
    <div
      className={`h-screen grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 relative ${
        model && cart.length < 5 && "overflow-hidden"
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
      {model && <Model cart={cart} resetOrder={resetOrder} />}
    </div>
  );
}
