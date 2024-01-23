import React from "react";
import App from "./components/App";
import "./index.css";
import { createRoot, ReactDOM } from "react-dom/client";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
