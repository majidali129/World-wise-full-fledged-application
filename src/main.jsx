import React from "react";
import ReactDom from "react-dom/client";
import App from "./App";
import GlobalStyles from "./styles/GlobalStyles";

ReactDom.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GlobalStyles />
    <App />
  </React.StrictMode>
);
