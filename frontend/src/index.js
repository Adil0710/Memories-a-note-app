import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./components/App";
import axios from "axios";
import { ThemeProvider } from "./context/ThemeProvider";

const apiUrl = process.env.REACT_APP_API_URL;
console.log('API URL:', apiUrl); // Debugging line to check if the URL is loaded
console.log(process.env);

axios.defaults.baseURL = `${apiUrl}`;
axios.defaults.withCredentials = true;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ThemeProvider>
    <App />
  </ThemeProvider>
);
