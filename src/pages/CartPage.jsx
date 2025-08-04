import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const {
    cart,
    increaseQuantity,
    decreaseQuantity,
    handleRemoveFromCart,
    clearCart,
  } = useCart();

  const navigate = useNavigate();

  const handleIncrease = (id) => increaseQuantity(id);
  const handleDecrease = (id) => decreaseQuantity(id);
  const handleRemove = (id) => handleRemoveFromCart(id);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-green-700">🛒 Your Cart</h2>

      {cart.length === 0 ? (
        <p className="text-gray-500 italic">Your cart is empty.</p>
      ) : (
        <>
          <ul className="space-y-4">
            {cart.map((item) => (
              <li
                key={item.id}
                className="bg-white rounded p-4 shadow flex justify-between items-center"
              >
                <div>
                  <h3 className="font-semibold text-lg">{item.name}</h3>
                  <p className="text-sm text-gray-500">
                    ₹{item.price} x {item.quantity}
                  </p>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleDecrease(item.id)}
                    className="px-2 py-1 bg-gray-300 rounded"
                  >
                    -
                  </button>
                  <span className="px-2">{item.quantity}</span>
                  <button
                    onClick={() => handleIncrease(item.id)}
                    className="px-2 py-1 bg-gray-300 rounded"
                  >
                    +
                  </button>
                  <button
                    onClick={() => handleRemove(item.id)}
                    className="text-red-500 ml-4"
                  >
                    🗑
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-6 text-right font-bold text-lg">
            Total: ₹{total}
          </div>

          <div className="mt-4 text-right space-x-2">
            <button
              onClick={clearCart}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Clear Cart
            </button>

            <button
              onClick={() => navigate("/checkout")}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
