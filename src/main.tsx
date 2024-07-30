import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import "./index.css";
import { BudgetProvider } from "./context/BudgetContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BudgetProvider>
      <App />
      <ToastContainer />
    </BudgetProvider>
  </React.StrictMode>
);
