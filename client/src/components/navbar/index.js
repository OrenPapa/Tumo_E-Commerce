import React from "react";
import Icon from "../icon";
import { useNavigate } from "react-router-dom";
import "./style.css"; // Import the stylesheet

function Navbar() {
  const navigate = useNavigate();

  return (
    <div className="navbar">
      <div className="navbar-title" onClick={() => navigate("/")}>
        My Shop
      </div>
      <div className="navbar-right-section">
        <Icon />
        <span className="navbar-count">0</span>
      </div>
    </div>
  );
}

export default Navbar;
