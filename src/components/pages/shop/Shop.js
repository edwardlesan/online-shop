import React, { useState, useEffect, useContext } from "react";
import "./Shop.css";
import axios from "axios";
import { Cartcontext } from "../../Context";

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
  const dispatch = globalState.dispatch;

  return (
    <div className="shop">
      <div className="products">
        {product.map((item, index) => {
          item.quantity = 1;
          return (
            <>
              <div className="product" key={index}>
                <img
                  src={item.image}
                  className="product-image"
                  alt="product-image"
                ></img>
                <div className="product-content">
                  <h5 className="product-title">{item.title}</h5>
                  <p className="product-desc">{item.description}</p>
                  <div className="price-container">
                    <p className="product-price">
                      <b>${item.price}</b>
                    </p>
                    <button
                      onClick={() => dispatch({ type: "ADD", payload: item })}
                      className="add-to-cart"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default Shop;
