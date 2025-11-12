import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import DashboardPage from "../pages/DashboardPage";
import UserListPage from "../pages/UserListPage";
import CustomerPage from "../pages/management/CustomerPage";
import ProductPage from "../pages/management/ProductPage";
import StorePage from "../pages/management/StorePage";
import SalePage from "../pages/management/SalePage";
import { isAuthenticated } from "../utils/auth";

const PrivateRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" replace />;
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* 登录页 */}
      <Route path="/login" element={<LoginPage />} />

      {/* 仪表盘 */}
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <DashboardPage />
          </PrivateRoute>
        }
      />

      {/* 用户列表 */}
      <Route
        path="/users"
        element={
          <PrivateRoute>
            <UserListPage />
          </PrivateRoute>
        }
      />

      {/* 新增管理模块 */}
      <Route
        path="/customers"
        element={
          <PrivateRoute>
            <CustomerPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/products"
        element={
          <PrivateRoute>
            <ProductPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/stores"
        element={
          <PrivateRoute>
            <StorePage />
          </PrivateRoute>
        }
      />
      <Route
        path="/sales"
        element={
          <PrivateRoute>
            <SalePage />
          </PrivateRoute>
        }
      />

      {/* 默认重定向 */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
};

export default AppRoutes;