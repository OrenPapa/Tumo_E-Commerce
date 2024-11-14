import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/navbar";
import Loader from "../../components/loader";
import Footer from "../../components/footer";
import ShopContext from "../../context/shopContext";
import "./style.css";

const ProductDetail = () => {
  const { id } = useParams();
  const { fetchProductById, addToCart, removeFromCart, cart } =
    useContext(ShopContext);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const productData = await fetchProductById(id);
      setProduct(productData);
      setLoading(false);
    };
    fetchData();
  }, [id, fetchProductById]);

  const productInCart = cart.find((item) => item.id === parseInt(id));
  const count = productInCart ? productInCart.qty : 0;

  const incrementCount = () => {
    addToCart(product.id);
  };

  const decrementCount = () => {
    if (count > 0) removeFromCart(product.id);
  };

  if (loading || !product) return <Loader />;

  return (
    <>
      <Navbar />
      <div className="product-detail-container">
        <div className="product-detail-image-container">
          <img
            src={product.picture}
            alt={product.name}
            className="product-detail-image"
          />
        </div>
        <div className="product-detail-details">
          <h1 className="product-detail-title">{product.name}</h1>
          <p className="product-detail-description">{product.description}</p>
          <div className="product-detail-row">
            <p className="product-detail-price">
              Price: ${product.price.toFixed(2)}
            </p>
            <div className="product-detail-action-container">
              <button
                className="product-detail-button"
                onClick={decrementCount}
              >
                -
              </button>
              <span className="product-detail-count">{count}</span>
              <button
                className="product-detail-button"
                onClick={incrementCount}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductDetail;
