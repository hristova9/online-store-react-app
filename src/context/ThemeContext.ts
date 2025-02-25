import { createContext } from "react";

export interface ThemeContextType {
  theme: string;
  toggleTheme: () => void;
}

// Create the Theme Context
export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
