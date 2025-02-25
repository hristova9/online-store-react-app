import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import "./Navigation.css";

const Navigation: React.FC = () => {
  const themeContext = useContext(ThemeContext);
  if (!themeContext) throw new Error("ThemeContext is undefined");

  const { theme, toggleTheme } = themeContext;

  return (
    <nav className="navigation">
      <button onClick={toggleTheme} className="theme-toggle-btn">
        {theme === "light" ? "Peach Mode" : "White Mode"}
      </button>
      <div className="nav-links">
        <Link to="/" className="nav-btn">Products</Link>
        <Link to="/basket" className="nav-btn">Basket</Link>
      </div>
    </nav>
  );
};

export default Navigation;

