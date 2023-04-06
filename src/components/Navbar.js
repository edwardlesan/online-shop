import React from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, ShoppingBag } from "phosphor-react";
import "../components/Navbar.css";

const Navbar = () => {
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
        <ShoppingCart size={35} color="white" />
      </Link>
    </navbar>
  );
};

export default Navbar;
