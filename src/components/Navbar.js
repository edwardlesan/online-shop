import React from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, ShoppingBag } from "phosphor-react";
import "../components/Navbar.css";
import { useContext } from "react";
import { Cartcontext } from "./Context";

const Navbar = () => {
  const globalState = useContext(Cartcontext);
  console.log(globalState.totalQuantity, "context nav");

  return (
    <navbar className="navbar">
      <div className="navbar-logo">
        <Link className="navbar-title" to="/">
          Online-Shopping
        </Link>
        <Link className="links" to="/">
          <ShoppingBag size={35} color="white" />
        </Link>
      </div>
      <Link className="links" to="/cart">
        <ShoppingCart className="shopping-cart" size={35} color="white" />
      </Link>
      <p className="cart-prod-nr">{globalState.totalQuantity}</p>
    </navbar>
  );
};

export default Navbar;
