import React, { useContext } from "react";
import ShopContext from "../../context/shopContext";
import ProductCard from "../../components/productCard";
import Loader from "../../components/loader";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import "./style.css";

const Home = () => {
  const { products, loading } = useContext(ShopContext);

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
