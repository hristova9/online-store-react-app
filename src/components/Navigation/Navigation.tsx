import React from "react";
import { Link } from "react-router-dom";
import "./Navigation.css";
import useTheme from "../../context/useTheme";

const Navigation: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className={`navigation ${theme}`}>
      <button onClick={toggleTheme} className="theme-toggle-btn">
        {theme === "light" ? "Peach Mode" : "White Mode"}
      </button>
      <h1 className="nav-title">Online Store</h1>
      <div className="nav-links">
        <Link to="/" className="nav-btn">
          Products
        </Link>
        <Link to="/basket" className="nav-btn">
          Basket
        </Link>
      </div>
    </nav>
  );
};

export default Navigation;
