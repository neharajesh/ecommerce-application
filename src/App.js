import './styles.css';
import { Home } from "./Home";
import { Cart } from './cart/Cart';
import { Products } from "./products/Products";
import { Wishlist } from "./wishlist/Wishlist";
import { NavLink } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import { ProductDetails } from './products/ProductDetails';
import { BrokenLinkPage } from './utilities/BrokenLinkPage';
import { AiOutlineMenu } from "react-icons/ai";

export default function App() {
  return (
    <>
    <div className="navigation" id="nav-simple">
          <AiOutlineMenu size={26} className="nav-hamburger" />
          <h1 id="brand-name">Neha's Mart</h1>
          <div className="nav-links">
            <NavLink to="/" className="navButtons" activeClassName="navButtons-active" end> Home </NavLink>
            <NavLink className="navButtons" activeClassName="navButtons-active" to="/products"> Products </NavLink>
            <NavLink id="avatar-notification-container" className="navButtons" activeClassName="navButtons-active" to="/wishlist">
              <img id="nav-button-img" src="../images/wishlist.svg" alt="Wishlist"/>
            </NavLink>
            <NavLink id="avatar-notification-container" className="navButtons" activeClassName="navButtons-active" to="/cart">
              <img id="nav-button-img" src="../images/shopping-cart.svg" alt="Cart"/>
            </NavLink>
      </div>
    </div>
      
      <Routes>        
        <Route path="/products"><Products/></Route>
        <Route path="/products/:productId"><ProductDetails /></Route>
        <Route path="/wishlist"><Wishlist /></Route>
        <Route path="/cart"><Cart /></Route>
        <Route path="*"><BrokenLinkPage /></Route>
        <Route path="/"><Home /></Route>        
      </Routes>
    </>
  );
}