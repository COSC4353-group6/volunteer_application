import React from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import { HelmetProvider } from "react-helmet-async";
import "bootstrap/dist/css/bootstrap.min.css";

import App from "./App";

const root = createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </React.StrictMode>
);
