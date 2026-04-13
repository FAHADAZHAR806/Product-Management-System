import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App"; // This points to App.jsx in the SAME folder
import "./index.css"; // Essential for Tailwind

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
