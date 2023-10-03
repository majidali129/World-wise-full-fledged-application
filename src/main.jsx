import React from "react";
import ReactDom from "react-dom/client";
import { ErrorBoundary } from "react-error-boundary";
import App from "./App";
import GlobalStyles from "./styles/GlobalStyles";
import ErrorFallback from "./ui/ErrorFallback";

ReactDom.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GlobalStyles />
    <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => window.location.replace('/')} >
    <App />
    </ErrorBoundary>
  </React.StrictMode>
);
