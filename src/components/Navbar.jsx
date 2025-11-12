import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { clearAuth } from "../utils/auth";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    clearAuth();
    navigate("/login");
  };

  const linkClass =
    "px-4 py-2 rounded hover:bg-blue-600 hover:text-white transition";

  return (
    <nav className="bg-blue-700 text-white flex justify-between items-center px-6 py-3 shadow">
      <div className="flex space-x-3">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? "bg-blue-600" : ""}`
          }
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/users"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? "bg-blue-600" : ""}`
          }
        >
          Users
        </NavLink>
        <NavLink
          to="/customers"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? "bg-blue-600" : ""}`
          }
        >
          Customers
        </NavLink>
        <NavLink
          to="/products"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? "bg-blue-600" : ""}`
          }
        >
          Products
        </NavLink>
        <NavLink
          to="/stores"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? "bg-blue-600" : ""}`
          }
        >
          Stores
        </NavLink>
        <NavLink
          to="/sales"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? "bg-blue-600" : ""}`
          }
        >
          Sales
        </NavLink>
      </div>

      <button
        onClick={handleLogout}
        className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
      >
        Logout
      </button>
    </nav>
  );
};

export default Navbar;