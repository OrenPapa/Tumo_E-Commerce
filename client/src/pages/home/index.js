import React, { useEffect, useState } from "react";
import ProductCard from "../../components/productCard";
import Loader from "../../components/loader";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import "./style.css";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = fetch("http://localhost:5000/api/products")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching products:", error));

    const delay = new Promise((resolve) => setTimeout(resolve, 500));

    Promise.all([fetchData, delay]).then(() => setLoading(false));
  }, []);

  return (
    <>
      <Navbar />
      {loading ? (
        <Loader />
      ) : (
        <div className="home-container">
          <h1 className="home-title">Products</h1>
          <div className="home-grid">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default Home;
