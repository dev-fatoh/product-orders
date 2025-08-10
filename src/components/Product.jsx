import React, { useState } from "react";

export default function Product({ product, addToCart }) {
  const [add, setAdd] = useState(false);
  const [quantity, setQuantity] = useState(product.quantity || 1);
  function decrementQuntity() {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  }
  function incrementQuntity() {
    setQuantity((prev) => prev + 1);
  }

  return (
    <div className="col-span-1 p-6 cursor-pointer mx-auto">
      <div className="relative mb-10" onClick={() => setAdd(!add)}>
        <img
          className="rounded-2xl hover:border-1 hover:boreder-red-900"
          src={product.image.desktop}
          alt="product image"
        />
        {add ? (
          <button
            className="absolute bottom-0 left-1/2 w-1/2 rounded-3xl p-2 -translate-x-1/2 border-1 border-red-900 translate-y-1/2 bg-red-900 text-black text-[1.3rem] flex justify-around items-center"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <button
              className="p-1 boreder-1 border-white text-white text-base"
              onClick={decrementQuntity}
            >
              -
            </button>
            <span className="text-white text-base">{quantity}</span>
            <button
              className="p-1 boreder-1 border-white text-white text-base"
              onClick={incrementQuntity}
            >
              +
            </button>
          </button>
        ) : (
          <button
            className="absolute bottom-0 left-1/2 w-1/2 rounded-3xl p-2 -translate-x-1/2 border-1 border-red-900 translate-y-1/2 bg-white text-black text-[1.3rem]"
            onClick={() => {
              addToCart(product, quantity);
            }}
          >
            Add to card
          </button>
        )}
      </div>

      <p className="mt-4 text-2xl">{product.category}</p>
      <h3 className="text-base">{product.name}</h3>
      <p className="text-orange-800 font-bold text-2xl">
        $ {product.price.toFixed(2)}
      </p>
    </div>
  );
}
