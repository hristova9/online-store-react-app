import { Provider } from "react-redux";
import "./App.css";
import ListProductPage from "./pages/ListProductsPage/ListProductsPage";
import store from "./store/store";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import BasketPage from "./pages/BasketPage/BasketPage";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import Navigation from "./components/Navigation/Navigation";
import { ThemeProvider } from "./context/ThemeProvider";

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider  >
        <BrowserRouter>
          <Navigation />
          <main id="main">
            <Routes>
              <Route path="/" element={<ListProductPage />} />
              <Route path="/basket" element={<BasketPage />} />
              <Route path="/products/:id" element={<ProductDetails />} />
            </Routes>
          </main>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
