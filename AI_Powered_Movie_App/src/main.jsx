// src/main.jsx
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import store from "./app/store.js";
import ToggleColorMode from "./utils/ToggleColorMode.jsx";
import App from "./App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <ToggleColorMode>
      <App />
    </ToggleColorMode>
  </Provider>
);
