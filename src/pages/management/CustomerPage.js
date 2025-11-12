import React, { useEffect, useState } from "react";
import api from "../../services/api";

const CustomerPage = () => {
  const [customers, setCustomers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ id: null, name: "", address: "" });

  // ✅ 初始化加载客户列表
  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const res = await api.get("/Customers");
      setCustomers(res.data);
    } catch (err) {
      console.error("Failed to fetch customers:", err);
    }
  };

  // ✅ 打开创建或编辑弹窗
  const openModal = (customer = null) => {
    if (customer) {
      setEditMode(true);
      setFormData({
      id: customer.id || customer.Id, // 确保有 id
      name: customer.name || customer.Name || "",
      address: customer.address || customer.Address || "",
    });
    } else {
      setEditMode(false);
      setFormData({ id: null, name: "", address: "" });
    }
    setIsModalOpen(true);
  };

  // ✅ 提交（新增或编辑）
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editMode) {
        // ✅ 编辑模式：完整提交 formData（包含 id）
        await api.put(`/Customers/${formData.id}`, formData);
      } else {
        // ✅ 新建模式：去掉 id 字段再提交
        const { id, ...newData } = formData;
        await api.post("/Customers", newData);
      }
      setIsModalOpen(false);
      fetchCustomers();
    } catch (err) {
      console.error("Failed to save customer:", err);
    }
  };

  // ✅ 删除客户
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this customer?")) return;
    try {
      await api.delete(`/Customers/${id}`);
      fetchCustomers();
    } catch (err) {
      console.error("Failed to delete customer:", err);
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Customer Management</h1>
        <button
          onClick={() => openModal()}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Add Customer
        </button>
      </div>

      {/* 客户表格 */}
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Address</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((c) => (
            <tr key={c.id}>
              <td className="border px-4 py-2">{c.id}</td>
              <td className="border px-4 py-2">{c.name}</td>
              <td className="border px-4 py-2">{c.address}</td>
              <td className="border px-4 py-2 space-x-2">
                <button
                  onClick={() => openModal(c)}
                  className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(c.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 弹窗 */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">
              {editMode ? "Edit Customer" : "Add New Customer"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full border rounded px-3 py-2"
                required
              />
              <input
                type="text"
                placeholder="Address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full border rounded px-3 py-2"
                required
              />
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  {editMode ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerPage;