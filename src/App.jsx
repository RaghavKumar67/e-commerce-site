import { useState, useEffect } from "react";
import ProductList from "./components/ProductList";
import products from "./data/products";
import { useCart } from "./context/CartContext";

function App() {
  const {
    cart,
    handleAddToCart,
    handleRemoveFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
  } = useCart();

  const [showCheckout, setShowCheckout] = useState(false);

  // Form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [paymentDetails, setPaymentDetails] = useState("");

  const [orderPlaced, setOrderPlaced] = useState(false); // popup

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !name ||
      !email ||
      !address ||
      !paymentMethod ||
      (paymentMethod !== "COD" && !paymentDetails)
    ) {
      alert("⚠️ Please fill in all required fields.");
      return;
    }

    // Simulate fake delay
    setTimeout(() => {
      clearCart();
      setShowCheckout(false);
      setOrderPlaced(true);

      setName("");
      setEmail("");
      setAddress("");
      setPaymentMethod("");
      setPaymentDetails("");
    }, 1000);
  };

  // Auto-hide popup after 3 seconds using useEffect
  useEffect(() => {
    if (orderPlaced) {
      const timer = setTimeout(() => setOrderPlaced(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [orderPlaced]);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 relative">
      <header className="bg-white shadow p-6 mb-8">
        <h1 className="text-4xl font-bold text-center text-black-700">
          🛍️ Product Catalog
        </h1>
      </header>

      <main className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Product List */}
        <section className="md:col-span-2">
          <ProductList products={products} />
        </section>

        {/* Cart Sidebar */}
        <aside className="md:col-span-1">
          <div className="bg-white rounded-lg shadow p-6 sticky top-6">
            <h2 className="text-xl font-semibold mb-4 flex justify-between items-center text-green-700">
              🛒 Cart{" "}
              <span className="text-sm text-gray-500">
                {cart.length} item{cart.length !== 1 && "s"}
              </span>
            </h2>

            <p className="text-sm text-gray-600 mb-2">
              🧾 Total Items: <span className="font-semibold">{totalItems}</span>
            </p>

            {cart.length === 0 ? (
              <p className="text-gray-500 italic">Your cart is empty.</p>
            ) : (
              <>
                <ul className="space-y-4">
                  {cart.map((item) => (
                    <li key={item.id} className="flex flex-col gap-2 border-b pb-2">
                      <div className="flex justify-between items-center">
                        <div>
                          <span className="font-medium">{item.name}</span>{" "}
                          <span className="text-sm text-gray-600">₹{item.price}</span>
                        </div>
                        <button
                          onClick={() => handleRemoveFromCart(item.id)}
                          className="text-red-600 text-sm hover:underline"
                        >
                          🗑 Remove
                        </button>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => decreaseQuantity(item.id)}
                          className="bg-gray-200 px-2 py-1 rounded hover:bg-gray-300"
                        >
                          ➖
                        </button>
                        <span className="px-2">{item.quantity}</span>
                        <button
                          onClick={() => increaseQuantity(item.id)}
                          className="bg-gray-200 px-2 py-1 rounded hover:bg-gray-300"
                        >
                          ➕
                        </button>
                        <span className="ml-auto font-semibold">
                          ₹{item.price * item.quantity}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>

                {/* Total Price */}
                <div className="mt-4 text-right font-bold text-lg text-black">
                  Total: ₹{totalPrice}
                </div>

                {/* Checkout Section */}
                {!showCheckout && (
                  <button
                    onClick={() => setShowCheckout(true)}
                    className="w-full mt-4 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                  >
                    Proceed to Checkout
                  </button>
                )}

                {showCheckout && (
                  <form
                    onSubmit={handleSubmit}
                    className="mt-4 p-4 bg-gray-100 rounded-lg space-y-3"
                  >
                    <h3 className="font-semibold text-lg mb-2">Checkout</h3>

                    <input
                      type="text"
                      placeholder="Full Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full p-2 border rounded"
                      required
                    />
                    <input
                      type="email"
                      placeholder="Email Address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full p-2 border rounded"
                      required
                    />
                    <input
                      type="text"
                      placeholder="Shipping Address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full p-2 border rounded"
                      required
                    />

                    <select
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-full p-2 border rounded"
                      required
                    >
                      <option value="">Select Payment Method</option>
                      <option value="UPI">UPI</option>
                      <option value="Card">Credit/Debit Card</option>
                      <option value="COD">Cash on Delivery</option>
                    </select>

                    {(paymentMethod === "UPI" || paymentMethod === "Card") && (
                      <input
                        type="text"
                        placeholder={
                          paymentMethod === "UPI"
                            ? "Enter UPI ID"
                            : "Enter Card Number"
                        }
                        value={paymentDetails}
                        onChange={(e) => setPaymentDetails(e.target.value)}
                        className="w-full p-2 border rounded"
                        required
                      />
                    )}

                    <div className="flex justify-between gap-2">
                      <button
                        type="button"
                        onClick={() => setShowCheckout(false)}
                        className="w-1/2 bg-gray-500 text-white py-2 rounded hover:bg-gray-600"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="w-1/2 bg-green-600 text-white py-2 rounded hover:bg-green-700"
                      >
                        Confirm Order
                      </button>
                    </div>
                  </form>
                )}
              </>
            )}
          </div>
        </aside>
      </main>

      {/* ✅ Order Placed Popup */}
      {orderPlaced && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white px-8 py-6 rounded-lg shadow-lg text-center animate-fade-in-up">
            <h2 className="text-2xl font-bold text-green-600 mb-2">✅ Order Placed!</h2>
            <p className="text-gray-700">Thank you for your purchase.</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
