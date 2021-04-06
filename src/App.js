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
      <nav>
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
      </nav>
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