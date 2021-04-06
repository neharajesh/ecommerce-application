import './styles.css';
import { Home } from "./Home";
import { Cart } from './cart/Cart';
import { Products } from "./products/Products";
import { Wishlist } from "./wishlist/Wishlist";
import { NavLink } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';

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
        <NavLink
          className="navButtons"
          activeClassName="navButtons-active"
          to="/wishlist"
        >
          Wishlist
        </NavLink>
        <NavLink
          className="navButtons"
          activeClassName="navButtons-active"
          to="/cart"
        >
          Cart
        </NavLink>
          </div>
      </div>
    </div>
      
      <Routes>
        <Route path="/">
          {" "}
          <Home />{" "}
        </Route>
        <Route path="/products">
          {" "}
          <Products />{" "}
        </Route>
        <Route path="/wishlist">
          <Wishlist />
        </Route>
        <Route path="/cart">
          <Cart />
        </Route>
      </Routes>
    </>
  );
}