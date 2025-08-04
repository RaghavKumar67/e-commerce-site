import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { CartProvider } from './context/CartContext'; // adjust path
import { Toaster } from 'react-hot-toast'; // ⬅️ import Toaster
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <CartProvider>
        <App />
        <Toaster position="top-right" reverseOrder={false} />
      </CartProvider>
    </BrowserRouter>  
  </React.StrictMode>
);
