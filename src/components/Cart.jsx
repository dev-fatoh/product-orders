import React from "react";

export default function Cart({ products }) {
  return (
    <div>
      <h2 className="text-3xl font-bold text-center my-4">
        Your cart({products ? products.length : 0})
      </h2>
      {products.map((product) => (
        <div key={product.id}>
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-xl">{product.name}</h3>
              <p className="text-gray-600">Quantity: {product.quantity}</p>
            </div>
            <p className="text-orange-800 font-bold text-xl">
              $ {(product.price * product.quantity).toFixed(2)}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
