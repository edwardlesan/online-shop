import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { Cartcontext } from "../../Context";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "./Product.css";
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

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);

  const globalState = useContext(Cartcontext);
  const state = globalState.state;
  const dispatch = globalState.dispatch;

  var totalQuantity = state.reduce((totalQuantity, item) => {
    return totalQuantity + item.quantity;
  }, 0);

  useEffect(() => {
    globalState.setTotalQuantity(totalQuantity);
  }, [totalQuantity]);

  useEffect(() => {
    const getProduct = async () => {
      setLoading(true);
      const res = await axios.get(`https://fakestoreapi.com/products/${id}`);
      const data = res.data;
      setProduct(data);
      setLoading(false);
    };
    getProduct();
  }, []);

  const Loading = () => {
    return <div className="loading-product">Loading...</div>;
  };

  const ShowProduct = () => {
    console.log(product, "mess");
    return (
      <div className="single-product-page">
        <div className="single-product-container">
          <img className="single-product-img" src={product.image} alt=""></img>
          <div className="single-product-content">
            <h2 className="single-product-title">{product.title}</h2>
            <p className="single-product-desc">{product.description}</p>
            <p className="single-product-categ">{product.category}</p>
            <div className="single-price-container">
              <h4 className="single-product-price">${product.price}</h4>
              <div className="button-container">
                <Link className="view-item" to="/">
                  Go back
                </Link>
                <button
                  className="add-to-cart"
                  onClick={() => {
                    console.log("----------- product", product);
                    dispatch({ type: "ADD", payload: product });
                    notify();
                    totalQuantity++;
                  }}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className="container">
        <div className="row">{loading ? <Loading /> : <ShowProduct />}</div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Product;
