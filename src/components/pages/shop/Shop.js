import React, { useState, useEffect, useContext } from "react";
import "./Shop.css";
import axios from "axios";
import { Cartcontext } from "../../Context";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const notify = () => {
  toast.success("Product added succesfully!", {
    position: "top-right",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });
};

const Shop = () => {
  const [product, setProduct] = useState([]);

  console.log(product);
  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    const res = await axios.get("https://fakestoreapi.com/products");
    const data = res.data;
    setProduct(data);
  };

  const globalState = useContext(Cartcontext);
  const state = globalState.state;
  const dispatch = globalState.dispatch;

  var totalQuantity = state.reduce((totalQuantity, item) => {
    return totalQuantity + item.quantity;
  }, 0);

  useEffect(() => {
    globalState.setTotalQuantity(totalQuantity);
  }, [totalQuantity]);

  return (
    <div className="shop">
      <div className="products">
        {product.map((item, index) => {
          item.quantity = 1;
          console.log(item, "message");
          return (
            <>
              <div className="product" key={index}>
                <Link to={`/${item.id}`}>
                  <img
                    src={item.image}
                    className="product-image"
                    alt="product-image"
                  ></img>
                </Link>
                <div className="product-content">
                  <h5 className="product-title">{item.title}</h5>
                  <p className="product-desc">{item.description}</p>
                  <div className="price-container">
                    <p className="product-price">
                      <b>${item.price}</b>
                    </p>
                    <div className="button-container">
                      <Link to={`/${item.id}`} className="view-item">
                        View product
                      </Link>
                      <button
                        onClick={() => {
                          dispatch({ type: "ADD", payload: item });
                          notify();
                          totalQuantity++;
                        }}
                        className="add-to-cart"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <ToastContainer />
            </>
          );
        })}
      </div>
    </div>
  );
};

export default Shop;
