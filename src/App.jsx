import { useState } from "react";
import ProductList from "./components/ProductList";
import products from "./data/products";

function App() {
  const [cart, setCart] = useState([]);

  const handleAddToCart = (product) => {
    setCart([...cart, product]);
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      {/* Header */}
      <header className="bg-white shadow p-6 mb-8">
        <h1 className="text-4xl font-bold text-center text-black-700">
          🛍️ Product Catalog
        </h1>
      </header>

      {/* Main content grid */}
      <main className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Product Section */}
        <section className="md:col-span-2">
          <ProductList products={products} onAddToCart={handleAddToCart} />
        </section>

        {/* Cart Section */}
        <aside className="md:col-span-1">
          <div className="bg-white rounded-lg shadow p-6 sticky top-6">
            <h2 className="text-xl font-semibold mb-4 flex justify-between items-center text-green-700">
              🛒 Cart <span className="text-sm text-gray-500">{cart.length} item{cart.length !== 1 && "s"}</span>
            </h2>

            {cart.length === 0 ? (
              <p className="text-gray-500 italic">Your cart is empty.</p>
            ) : (
              <ul className="space-y-3">
                {cart.map((item, index) => (
                  <li
                    key={index}
                    className="flex justify-between items-center border-b pb-2"
                  >
                    <span>{item.name}</span>
                    <span className="text-indigo-600 font-medium">
                      ₹{item.price}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </aside>
      </main>
    </div>
  );
}

export default App;
