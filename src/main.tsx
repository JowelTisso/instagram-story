import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { store } from "./store.ts";
import Modal from "react-modal";
import ErrorBoundary from "./components/ErrorBoundary.tsx";

Modal.setAppElement("#root");

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </Provider>
);
