import './styles.css';
import { Home } from "./Home";
import { Cart } from './cart/Cart';
import { Products } from "./products/Products";
import { Wishlist } from "./wishlist/Wishlist";
import { NavLink } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import { ProductDetails } from './products/ProductDetails';
import { BrokenLinkPage } from './BrokenLinkPage';

export default function App() {
  return (
    <>
    <div className="navigation">
      <div id="nav-simple">
        <div>
            <h1 id="brand-name">Neha's Mart</h1>
        </div>
          <div className="nav-links">
          <NavLink
          to="/"
          className="navButtons"
          activeClassName="navButtons-active"
        >
          Home
        </NavLink>
        <NavLink
          className="navButtons"
          activeClassName="navButtons-active"
          to="/products"
        >
          Products
        </NavLink>
        <NavLink id="avatar-notification-container"
          className="navButtons"
          activeClassName="navButtons-active"
          to="/wishlist"
        >
          {/* <span id="avatar-notification-badge">1</span> */}
          <img id="nav-button-img" src="../images/wishlist.svg" alt="Wishlist"/>
        </NavLink>
        <NavLink id="avatar-notification-container"
          className="navButtons"
          activeClassName="navButtons-active"
          to="/cart"
        >
          {/* <span id="avatar-notification-badge">1</span> */}
          <img id="nav-button-img" src="../images/shopping-cart.svg" alt="Cart"/>
        </NavLink>
          </div>
      </div>
    </div>
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:productId" element={<ProductDetails />}/>
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="*" element={<BrokenLinkPage />}/>
      </Routes>
    </>
  );
}