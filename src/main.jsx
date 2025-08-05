import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { Toaster } from 'react-hot-toast';
import AppRoutes from './Routes'; // ⬅️ use new Routes component

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <CartProvider>
        <AppRoutes /> {/* ⬅️ handles all routes */}
        <Toaster position="bottom-right" reverseOrder={false} />
      </CartProvider>
    </BrowserRouter>
  </React.StrictMode>
);
