import React, { useContext } from "react";
import Icon from "../icon";
import { useNavigate } from "react-router-dom";
import "./style.css"; // Import the stylesheet
import ShopContext from "../../context/shopContext";

function Navbar() {
  const navigate = useNavigate();
  const { cartLength } = useContext(ShopContext);

  return (
    <div className="navbar">
      <div className="navbar-title" onClick={() => navigate("/")}>
        My Shop
      </div>
      <div className="navbar-right-section" onClick={() => navigate("/cart")}>
        <Icon />
        <span className="navbar-count">{cartLength}</span>
      </div>
    </div>
  );
}

export default Navbar;
