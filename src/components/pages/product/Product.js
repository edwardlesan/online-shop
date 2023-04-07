import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { Cartcontext } from "../../Context";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "./Product.css";

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);

  const globalState = useContext(Cartcontext);
  const dispatch = globalState.dispatch;

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
    return <>Loading...</>;
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
                  onClick={() => dispatch({ type: "ADD", payload: product })}
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
    </div>
  );
};

export default Product;
