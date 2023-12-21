import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./store";
import { NavigationProvider } from "./context/navigation";
import { HistoryProvider } from "./context/history";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <NavigationProvider>
        <HistoryProvider>
          <App />
        </HistoryProvider>
      </NavigationProvider>
    </Provider>
  </React.StrictMode>
);
