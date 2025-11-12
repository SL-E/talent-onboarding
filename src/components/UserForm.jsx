import React, { useState } from "react";
import axios from "axios";

const UserForm = ({ onUserAdded }) => {
  const [formData, setFormData] = useState({ name: "", email: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email) {
      alert("Please fill out both name and email.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5071/api/users", formData);
      alert("User added successfully!");
      setFormData({ name: "", email: "" });
      onUserAdded?.(response.data); // ✅ 调用父组件更新用户列表
    } catch (error) {
      console.error("Error adding user:", error);
      alert("Failed to add user. Please check the console for details.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        border: "1px solid #ccc",
        padding: "20px",
        borderRadius: "8px",
        maxWidth: "400px",
        margin: "20px auto",
      }}
    >
      <h3>Add New User</h3>
      <div style={{ marginBottom: "10px" }}>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          style={{ width: "100%", padding: "8px" }}
        />
      </div>
      <div style={{ marginBottom: "10px" }}>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          style={{ width: "100%", padding: "8px" }}
        />
      </div>
      <button type="submit" style={{ padding: "8px 16px" }}>
        Add User
      </button>
    </form>
  );
};

export default UserForm;