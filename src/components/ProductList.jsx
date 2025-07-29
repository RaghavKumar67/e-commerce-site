const ProductList = ({ products, onAddToCart }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {products.map((product) => (
        <div
          key={product.id}
          className="bg-white p-6 rounded-xl shadow hover:shadow-lg border border-gray-200 transition-all duration-200"
        >
          <h3 className="text-lg font-bold text-gray-800 mb-2">
            {product.name}
          </h3>
          <p className="text-gray-700 mb-1">₹{product.price}</p>
          <p
            className={`mb-4 font-medium ${
              product.inStock ? "text-green-600" : "text-red-500"
            }`}
          >
            {product.inStock ? "In Stock" : "Out of Stock"}
          </p>

          <button
            disabled={!product.inStock}
            onClick={() => onAddToCart(product)}
            className={`w-full py-2 px-4 rounded-lg font-semibold transition duration-200 ${
              product.inStock
                ? "bg-green-600 text-white hover:bg-blue-700"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            {product.inStock ? "Add to Cart" : "Unavailable"}
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
