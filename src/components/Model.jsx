import confirmIcon from "../assets/icon-order-confirmed.svg";
export default function Model({ cart, resetOrder }) {
  return (
    <div
      className={`absolute top-0 left-0 right-0 z-10 bg-black/50 ${cart.length > 4 ? "min-h-[200vh]" : "h-screen"} w-full flex items-center justify-center`}
    >
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
            <h2 className="text-2xl font-bold">Order Total</h2>
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
          onClick={resetOrder}
        >
          Start New Order
        </button>
      </div>
    </div>
  );
}
