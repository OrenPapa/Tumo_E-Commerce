import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/navbar";
import Loader from "../../components/loader";
import Footer from "../../components/footer";
import "./style.css"; 

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = fetch(`http://localhost:5000/api/products/${id}`)
      .then((response) => response.json())
      .then((data) => setProduct(data))
      .catch((error) => console.error("Error fetching product:", error));

    const delay = new Promise((resolve) => setTimeout(resolve, 500));

    Promise.all([fetchData, delay]).then(() => setLoading(false));
  }, [id]);

  const incrementCount = () => {
    setCount(count + 1);
  };

  const decrementCount = () => {
    if (count > 0) setCount(count - 1);
  };

  if (loading) return <Loader />;

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
