import React, { useEffect } from "react";
import "./Cart.css";
import { useContext } from "react";
import { Cartcontext } from "../../Context";
import { Link } from "react-router-dom";

const Cart = () => {
  const globalState = useContext(Cartcontext);
  const state = globalState.state;
  const dispatch = globalState.dispatch;

  const total = state.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  const totalQuantity = state.reduce((totalQuantity, item) => {
    return totalQuantity + item.quantity;
  }, 0);

  useEffect(() => {
    globalState.setTotalQuantity(totalQuantity);
  }, [totalQuantity]);

  function NoItemsMessage() {
    return (
      <div className="no-prods-container">
        <h2 className="no-prods-msg">Your shopping cart is currently empty!</h2>
        <Link className="view-item" to="/">
          Go back
        </Link>
      </div>
    );
  }

  return (
    <div className="cart">
      <h4 className="cart-title">My cart</h4>

      {totalQuantity === 0 ? (
        <NoItemsMessage />
      ) : (
        state.map((item, index) => (
          <div className="product-card" key={index}>
            <img
              className="product-img"
              src={item.image}
              alt="product image"
            ></img>
            <p className="product-title">{item.title}</p>
            <p className="product-quantity">{item.quantity}</p>
            <p className="product-price">
              ${item.quantity * item.price.toFixed(2)}
            </p>
            <div className="quantity">
              <button
                onClick={() => dispatch({ type: "INCREASE", payload: item })}
              >
                +
              </button>
              <p>{item.quantity}</p>
              <button
                onClick={() => {
                  if (item.quantity > 1) {
                    dispatch({ type: "DECREASE", payload: item });
                  } else {
                    if (window.confirm("Remove the product?")) {
                      dispatch({ type: "REMOVE", payload: item });
                    }
                  }
                }}
              >
                -
              </button>
            </div>
            <h2
              onClick={() => {
                if (window.confirm("Remove the product?")) {
                  dispatch({ type: "REMOVE", payload: item });
                }
              }}
            >
              x
            </h2>
          </div>
        ))
      )}

      {state.length > 0 && (
        <div className="total">
          <p>Total:</p>
          <h2>${total.toFixed(2)}</h2>
        </div>
      )}
    </div>
  );
};

export default Cart;
