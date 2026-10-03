import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router";
import App from "./App";
import "./styles.css";
import { AuthProvider } from "./auth/AuthProvider";

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
