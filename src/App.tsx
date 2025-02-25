import { Provider } from "react-redux";
import "./App.css";
import ListProductPage from "./pages/ListProductsPage/ListProductsPage";
import store from "./store/store";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import BasketPage from "./pages/BasketPage/BasketPage";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <main id="main">
          <Routes>
            <Route path="/" element={<ListProductPage />} />
            <Route path="/basket" element={<BasketPage/>} />
          </Routes>
        </main>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
