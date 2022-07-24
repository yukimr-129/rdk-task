import React from "react";
import { Routes, Route } from "react-router-dom";
import App from "../App";
import Login from "../features/login/Login";

const Routing = () => {
  return (
    <Routes>
      <Route path="/tasks" element={<App />} />
      <Route path="/" element={<Login />} />
      {/* <Route path="/task" element={<Login />} /> */}
    </Routes>
  );
};

export default Routing;
