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
  } = useCart();


  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);


  return (
    
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <header className="bg-white shadow p-6 mb-8">
        <h1 className="text-4xl font-bold text-center text-black-700">
          🛍️ Product Catalog
        </h1>
      </header>

      <main className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Product List Section */}
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

                {/* 💰 Total Price */}
                <div className="mt-4 text-right font-bold text-lg text-black">
                  Total: ₹
                  {cart.reduce(
                    (total, item) => total + item.price * item.quantity,
                    0
                  )}
                </div>
              </>
            )}
          </div>
        </aside>
      </main>
    </div>
  );
}

export default App;
