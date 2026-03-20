import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Plans from "./Plans";
import "./index.css";
      import Profile from "./Profile";


import { BrowserRouter, Routes, Route } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>

<Routes>
  <Route path="/" element={<Plans />} />
  <Route path="/dashboard" element={<App />} />
  <Route path="/profile" element={<Profile />} />
</Routes>
    </BrowserRouter>
  </React.StrictMode>
);