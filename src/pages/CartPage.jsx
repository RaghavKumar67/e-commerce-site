import { useState } from "react";
import { useCart } from "../context/CartContext";

const CartPage = () => {
  const {
    cart,
    increaseQuantity,
    decreaseQuantity,
    handleRemoveFromCart,
    clearCart,
  } = useCart();

  const [showCheckout, setShowCheckout] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "" });

  const handleIncrease = (id) => increaseQuantity(id);
  const handleDecrease = (id) => decreaseQuantity(id);
  const handleRemove = (id) => handleRemoveFromCart(id);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleInputChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleOrderSubmit = (e) => {
    e.preventDefault();
    setOrderPlaced(true);
    clearCart();
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-green-700">🛒 Your Cart</h2>

      {orderPlaced ? (
        <div className="text-center text-green-600 text-xl font-semibold">
          ✅ Order placed successfully! Thank you, {formData.name}.
        </div>
      ) : cart.length === 0 ? (
        <p className="text-gray-500 italic">Your cart is empty.</p>
      ) : (
        <>
          <div className="text-sm text-gray-600 mb-2">
            📋 Total Items: <span className="font-bold">{totalItems}</span>
          </div>

          <ul className="space-y-4">
            {cart.map((item) => (
              <li
                key={item.id}
                className="bg-white rounded p-4 shadow flex justify-between items-center"
              >
                <div>
                  <h3 className="font-semibold text-lg">{item.name} <span className="text-sm text-gray-500">₹{item.price}</span></h3>
                  <p className="text-sm text-gray-500">
                    ₹{item.price} x {item.quantity}
                  </p>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleDecrease(item.id)}
                    className="px-2 py-1 bg-gray-300 rounded"
                  >
                    −
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
                    🗑 Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-6 text-right font-bold text-lg">
            Total: ₹{total}
          </div>

          {!showCheckout && (
            <div className="mt-4 text-right space-x-2">
              <button
                onClick={clearCart}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Clear Cart
              </button>

              <button
                onClick={() => setShowCheckout(true)}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Proceed to Checkout
              </button>
            </div>
          )}

          {showCheckout && (
            <form
              onSubmit={handleOrderSubmit}
              className="mt-8 bg-gray-100 p-6 rounded shadow"
            >
              <h3 className="text-xl font-semibold mb-4">Checkout Details</h3>

              <div className="mb-4">
                <label className="block mb-1 font-medium">Name:</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border rounded"
                />
              </div>

              <div className="mb-4">
                <label className="block mb-1 font-medium">Email:</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border rounded"
                />
              </div>

              <div className="text-right space-x-2">
                <button
                  type="button"
                  onClick={() => setShowCheckout(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
                >
                  Place Order
                </button>
              </div>
            </form>
          )}
        </>
      )}
    </div>
  );
};

export default CartPage;
