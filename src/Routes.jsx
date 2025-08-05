import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import App from "./App";
import CartPage from "./pages/CartPage";
import Checkout from "./pages/Checkout";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route index element={<App />} />
      <Route path="cart" element={<CartPage />} />
      <Route path="checkout" element={<Checkout />} />
    </Route>
  </Routes>
);

export default AppRoutes;
