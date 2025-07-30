import { useCart } from "../context/CartContext";

const ProductList = ({ products }) => {
  const { handleAddToCart } = useCart();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {products.map((product) => (
        <div key={product.id} className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold text-lg">{product.name}</h3>
          <p className="text-gray-600">₹{product.price}</p>
          <button
            onClick={() => handleAddToCart(product)}
            className="mt-2 px-4 py-1 bg-green-600 text-white rounded"
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
