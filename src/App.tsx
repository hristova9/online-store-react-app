import "./App.css";
import ListProductPage from "./pages/ListProductsPage/ListProductsPage";
import { ProductProvider } from "./services/ProductContext";

function App() {
  return (
    <main id="main">
      <ProductProvider>
        <ListProductPage />
s      </ProductProvider>
    </main>
  );
}

export default App;
