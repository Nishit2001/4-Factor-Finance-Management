import React from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom/dist";
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from "react-redux";
import { store,persistor } from "./redux/Store";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
      <Toaster/>
    </PersistGate>
    </Provider>
  </BrowserRouter>
);
