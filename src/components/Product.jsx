import { useState } from "react";
import addCart from "./../assets/icon-add-to-cart.svg";
import decrementQ from "./../assets/icon-decrement-quantity.svg";
import incrementQ from "./../assets/icon-increment-quantity.svg";

// Product component displays product details and allows quantity selection and adding to cart
export default function Product({ product, addToCart }) {
  const [add, setAdd] = useState(false); // State to toggle quantity selector
  const [quantity, setQuantity] = useState(product.quantity || 1); // State for product quantity

  // Decrement quantity, minimum value is 1
  function decrementQuantity() {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  }

  // Increment quantity
  function incrementQuantity() {
    setQuantity((prev) => prev + 1);
  }

  return (
    <div className="col-span-1 p-6 cursor-pointer mx-auto">
      {/* Product image and quantity/add to cart button */}
      <div className="relative mb-10" onClick={() => setAdd(!add)}>
        {/* Mobile image */}
        <img
          className="md:hidden lg:hidden rounded-2xl hover:border-1 hover:border-red-900"
          src={product.image.mobile}
          alt="product image"
        />
        {/* Tablet image */}
        <img
          className="hidden md:inline lg:hidden rounded-2xl hover:border-1 hover:border-red-900"
          src={product.image.tablet}
          alt="product image"
        />
        {/* Desktop image */}
        <img
          className="hidden lg:inline rounded-2xl hover:border-1 hover:border-red-900"
          src={product.image.desktop}
          alt="product image"
        />

        {/* Conditional rendering: show quantity selector or add to cart button */}
        {add ? (
          // Quantity selector
          <button
            className="absolute bottom-0 left-1/2 w-1/2 rounded-4xl p-2 -translate-x-1/2 border-1 border-red-900 translate-y-1/2 bg-red-900 text-black text-[1.3rem] flex justify-around items-center"
            onClick={(e) => {
              e.stopPropagation(); // Prevent parent click event
            }}
          >
            {/* Decrement button */}
            <button
              className="p-1 text-white text-2xl font-semibold"
              onClick={decrementQuantity}
            >
              <img src={decrementQ} alt=" decrement icon" />
            </button>
            {/* Quantity display */}
            <span className="text-white text-2xl">{quantity}</span>
            {/* Increment button */}
            <button
              className="p-1 text-white text-2xl font-semibold"
              onClick={incrementQuantity}
            >
              <img src={incrementQ} alt=" increment icon" />
            </button>
          </button>
        ) : (
          // Add to cart button
          <button
            className="absolute bottom-0 left-1/2 w-1/2 rounded-3xl p-2 -translate-x-1/2 border-1 border-red-900 translate-y-1/2 bg-white text-black text-[1.3rem] flex items-center justify-center gap-2"
            onClick={() => {
              addToCart(product, quantity); // Call addToCart with product and quantity
            }}
          >
            <img src={addCart} alt="add to cart icon" />
            Add to card
          </button>
        )}
      </div>

      {/* Product details */}
      <p className="mt-4 text-2xl">{product.category}</p>
      <h3 className="text-base">{product.name}</h3>
      <p className="text-orange-800 font-bold text-2xl">
        $ {product.price.toFixed(2)}
      </p>
    </div>
  );
}
