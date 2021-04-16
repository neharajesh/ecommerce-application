import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter as Router} from 'react-router-dom';
import { CartProvider } from './cart/cart-context';
import { WishlistProvider } from './wishlist/wishlist-context';
import { ProductProvider } from './products/product-context';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <ProductProvider>
        <WishlistProvider>
          <CartProvider>
            <App/>
          </CartProvider>
        </WishlistProvider>     
      </ProductProvider> 
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);