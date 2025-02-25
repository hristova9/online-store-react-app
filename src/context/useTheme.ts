import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";

// Custom Hook for Using the Theme Context
const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within a ThemeProvider");
  return context;
};

export default useTheme;
