import React from "react";
import "./Cart.css";
import { useContext } from "react";
import { Cartcontext } from "../../Context";

const Cart = () => {
  const globalState = useContext(Cartcontext);
  const state = globalState.state;
  const dispatch = globalState.dispatch;

  const total = state.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  return (
    <div className="cart">
      {state.map((item, index) => {
        return (
          <div className="product-card" key={index}>
            <img
              className="product-img"
              src={item.image}
              alt="product image"
            ></img>
            <p className="product-title">{item.title}</p>
            <p className="product-quantity">{item.quantity}</p>
            <p className="product-price">${item.quantity * item.price}</p>
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
                    dispatch({ type: "REMOVE", payload: item });
                  }
                }}
              >
                -
              </button>
            </div>
            <h2 onClick={() => dispatch({ type: "REMOVE", payload: item })}>
              x
            </h2>
          </div>
        );
      })}
      {state.length > 0 && (
        <div className="total">
          <p>Total:</p>
          <h2>${total}</h2>
        </div>
      )}
    </div>
  );
};

export default Cart;
