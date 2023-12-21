import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import "./index.css";
import { store } from "./store";

// Provider for history
import { HistoryProvider } from "./context/history";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <HistoryProvider>
        <App />
      </HistoryProvider>
    </Provider>
  </React.StrictMode>
);
