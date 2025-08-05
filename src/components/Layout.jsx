import { Link, Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <nav className="bg-white shadow p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-600">🛒 Product Catalog</h1>
        <div className="space-x-4">
          <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium">
            Home
          </Link>
          <Link to="/cart" className="text-gray-700 hover:text-blue-600 font-medium">
            Cart
          </Link>
          <Link to="/checkout" className="text-gray-700 hover:text-blue-600 font-medium">
            Checkout
          </Link>
        </div>
      </nav>

      <main className="p-6">
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
