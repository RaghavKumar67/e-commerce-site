import ProductList from "../components/ProductList";
import products from "../data/products";

const Home = () => {
  return (
    <section className="p-6">
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <ProductList products={products} />
    </section>
  );
};

export default Home;
