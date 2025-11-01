import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { clearAuth, getUser } from "../utils/auth";

const DashboardPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});

  // ✅ 页面加载时获取当前用户信息
  useEffect(() => {
    const currentUser = getUser();
    setUser(currentUser);
  }, []);

  // ✅ 登出逻辑
  const handleLogout = () => {
    clearAuth();
    navigate("/login");
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Welcome {user?.name || "Admin"} 👋</h1>
      <p style={styles.subtitle}>Talent Onboarding Management System</p >

      {/* ✅ 页面导航功能 */}
      <div style={styles.navContainer}>
        <Link to="/users" style={styles.navButton}>
          Manage Users
        </Link>
        <Link to="/companies" style={styles.navButton}>
          Manage Companies
        </Link>
        <Link to="/register" style={styles.navButton}>
          Register New User
        </Link>
      </div>

      {/* ✅ 登出按钮 */}
      <button onClick={handleLogout} style={styles.logoutButton}>
        Logout
      </button>
    </div>
  );
};

export default DashboardPage;

// ✅ 简洁样式
const styles = {
  container: {
    textAlign: "center",
    padding: "60px 20px",
    backgroundColor: "#f4f6f8",
    minHeight: "100vh",
  },
  title: {
    fontSize: "2rem",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  subtitle: {
    fontSize: "1.1rem",
    color: "#555",
    marginBottom: "30px",
  },
  navContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    flexWrap: "wrap",
    marginBottom: "40px",
  },
  navButton: {
    backgroundColor: "#007bff",
    color: "white",
    padding: "10px 20px",
    borderRadius: "5px",
    textDecoration: "none",
    fontWeight: "500",
  },
  logoutButton: {
    backgroundColor: "#dc3545",
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "5px",
    cursor: "pointer",
  },
};