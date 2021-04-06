import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter as Router} from 'react-router-dom';
import { CartProvider } from './cart/cart-context';
import { WishlistProvider } from './wishlist/wishlist-context';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <WishlistProvider>
        <CartProvider>
          <App/>
        </CartProvider>
      </WishlistProvider>      
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);