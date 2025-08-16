import empty from "../assets/illustration-empty-cart.svg";

export default function Cart({ products, handleModel }) {
  const totalPrice = products.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  // Render the cart UI
  return (
    <div className="overflow-y-auto bg-white border-1 border-gray-300 rounded-2xl p-5">
      {/* Cart header with item count */}
      <h2 className="text-3xl text-amber-800 font-bold text-center my-4">
        Your cart ({products ? products.length : 0})
      </h2>
      {/* Show empty cart illustration if no products */}
      {products.length === 0 ? (
        <div>
          <img src={empty} alt="Empty Cart" className="mx-auto w-1/2 mt-4" />
          <p className="text-center text-gray-500">
            Your added items will appear here
          </p>
        </div>
      ) : (
        <div>
          {/* List each product in the cart */}
          {products.map((product) => (
            <div key={product.id}>
              <div className="flex justify-between items-center mb-4 border-b-2 border-gray-200 pb-2">
                <div>
                  <h3 className="text-xl">{product.name}</h3>
                  <p className="text-gray-600">Quantity: {product.quantity}</p>
                </div>
                <p className="text-orange-800 font-bold text-base">
                  $ {(product.price * product.quantity).toFixed(2)}
                </p>
              </div>
            </div>
          ))}
          {/* Display the total price */}
          <div className="flex items-center justify-between mt-4">
            <h3 className="font-bold">Order Total:</h3>
            <p className="text-orange-800 font-bold">
              $ {totalPrice.toFixed(2)}
            </p>
          </div>
          {/* Confirm order button */}
          <button
            className="bg-amber-950 text-white w-3/4 mx-auto block rounded-4xl py-3 mt-6 cursor-pointer"
            onClick={handleModel}
          >
            Confirm Order
          </button>
        </div>
      )}
    </div>
  );
}
