import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import { AuthProvider } from "./contexts/AuthContext";
import { AssetsProvider } from "./contexts/AssetsContext";
import { Toaster } from "react-hot-toast";

import "./styles/index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <AssetsProvider>
        <App />
        <Toaster position="top-right" />
      </AssetsProvider>
    </AuthProvider>
  </React.StrictMode>
);