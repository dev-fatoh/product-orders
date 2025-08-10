import { useState } from "react";
import { data } from "../data.js";
import { v4 } from "uuid";
import Cart from "./components/Cart.jsx";
import Product from "./components/Product.jsx";
export default function App() {
  const [cart, setCart] = useState([]);
  function addToCart(product, quantity) {
    setCart((prev) => {
      const existingProduct = prev.find((item) => item.id === product.id);
      if (existingProduct) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: quantity } : item
        );
      }
      return [...prev, { ...product, quantity: quantity }];
    });
  }
  const products = data.map((product) => ({ id: v4(), ...product }));
  return (
    <div className="h-screen grid grid-cols-4 gap-1">
      <div className="bg-amber-50 col-span-3 grid grid-cols-3 gap-1">
        <h1 className="text-5xl p-2 col-span-3 text-orange-950 font-bold ml-4">
          Desserts
        </h1>
        {products.map((product) => (
          <Product key={product.id} product={product} addToCart={addToCart} />
        ))}
      </div>
      <div className="col-span-1 bg-white p-4">
        <Cart products={cart} />
      </div>
    </div>
  );
}
