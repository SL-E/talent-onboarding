import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      {/* 全局导航栏 */}
      <Navbar />

      {/* 路由区域 */}
      <AppRoutes />
    </Router>
  );
}

export default App;