import React, { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import { clearAuth } from "../utils/auth";

const UserListPage = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [newUser, setNewUser] = useState({ name: "", email: "" });
  const [editUser, setEditUser] = useState(null); // ✅ 当前正在编辑的用户
  const navigate = useNavigate();

  // ✅ 获取用户
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get("/users");
        setUsers(response.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch users");
      }
    };
    fetchUsers();
  }, []);

  // ✅ 新增用户
  const handleAddUser = async (e) => {
    e.preventDefault();
    if (!newUser.name || !newUser.email) {
      alert("Please fill out both name and email.");
      return;
    }
    try {
      const response = await api.post("/users", newUser);
      setUsers([...users, response.data]);
      setNewUser({ name: "", email: "" });
      alert("User added successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to add user.");
    }
  };

  // ✅ 删除用户
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await api.delete(`/users/${id}`);
        setUsers(users.filter((user) => user.id !== id));
        alert("User deleted successfully!");
      } catch (err) {
        console.error(err);
        alert("Failed to delete user.");
      }
    }
  };

  // ✅ 打开编辑模式
  const handleEdit = (user) => {
    setEditUser({ ...user });
  };

  // ✅ 提交更新
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/users/${editUser.id}`, editUser);

      // ✅ 更新后重新从后端加载最新数据
      const updatedList = await api.get("/users");
      setUsers(updatedList.data);

      setEditUser(null);
      alert("User updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to update user.");
    }
  };

  // ✅ 登出
  const handleLogout = () => {
    clearAuth();
    navigate("/login");
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>User Management</h2>
      {error && <p style={styles.error}>{error}</p >}

      {/* ✅ 新增用户 */}
      <form onSubmit={handleAddUser} style={styles.form}>
        <input
          type="text"
          placeholder="Name"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          style={styles.input}
        />
        <input
          type="email"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          style={styles.input}
        />
        <button type="submit" style={styles.addButton}>
          Add User
        </button>
      </form>

      {/* ✅ 用户表格 */}
      <table style={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <button onClick={() => handleEdit(user)} style={styles.editButton}>
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
                    style={styles.deleteButton}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" style={{ textAlign: "center" }}>
                No users found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* ✅ 编辑弹窗 */}
      {editUser && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <h3>Edit User</h3>
            <form onSubmit={handleUpdate}>
              <input
                type="text"
                value={editUser?.name || ""}
                onChange={(e) =>
                  setEditUser({ ...editUser, name: e.target.value })
                }
                style={styles.input}
              />
              <input
                type="email"
                value={editUser?.email || ""}
                onChange={(e) =>
                  setEditUser({ ...editUser, email: e.target.value })
                }
                style={styles.input}
              />
              <div style={{ marginTop: "10px" }}>
                <button type="submit" style={styles.saveButton}>
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setEditUser(null)}
                  style={styles.cancelButton}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <button onClick={handleLogout} style={styles.logoutButton}>
        Logout
      </button>
    </div>
  );
};

export default UserListPage;

// ✅ 样式
const styles = {
  container: {
    padding: "50px",
    backgroundColor: "#f4f6f8",
    minHeight: "100vh",
  },
  title: {
    textAlign: "center",
    fontSize: "26px",
    fontWeight: "bold",
    marginBottom: "30px",
  },
  error: {
    color: "red",
    textAlign: "center",
  },
  form: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    marginBottom: "20px",
  },
  input: {
    padding: "8px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    width: "200px",
  },
  addButton: {
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    padding: "8px 16px",
    borderRadius: "5px",
    cursor: "pointer",
  },
  editButton: {
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    padding: "6px 12px",
    borderRadius: "5px",
    cursor: "pointer",
    marginRight: "8px",
  },
  deleteButton: {
    backgroundColor: "#dc3545",
    color: "white",
    border: "none",
    padding: "6px 12px",
    borderRadius: "5px",
    cursor: "pointer",
  },
  logoutButton: {
    display: "block",
    margin: "30px auto",
    backgroundColor: "#6c757d",
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "6px",
    cursor: "pointer",
  },
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  modalContent: {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "10px",
    width: "300px",
    textAlign: "center",
    boxShadow: "0 0 10px rgba(0,0,0,0.2)",
  },
  saveButton: {
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    padding: "8px 16px",
    borderRadius: "5px",
    cursor: "pointer",
    marginRight: "10px",
  },
  cancelButton: {
    backgroundColor: "#6c757d",
    color: "white",
    border: "none",
    padding: "8px 16px",
    borderRadius: "5px",
    cursor: "pointer",
  },
};