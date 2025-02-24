import { Provider } from "react-redux";
import "./App.css";
import ListProductPage from "./pages/ListProductsPage/ListProductsPage";
import store from "./store/store";

function App() {
  return (
    <Provider store={store}>
      <main id="main">
        <ListProductPage />
      </main>
    </Provider>
  );
}

export default App;
