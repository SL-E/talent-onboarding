import React, { useEffect, useState } from "react";
import api from "../../services/api";

const SalePage = () => {
  const [sales, setSales] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    id: null,
    customerId: "",
    productId: "",
    storeId: "",
    dateSold: "",
  });

  useEffect(() => {
    fetchSales();
  }, []);

  const fetchSales = async () => {
    const res = await api.get("/sales");
    setSales(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const payload = {
        customerId: Number(formData.customerId),
        productId: Number(formData.productId),
        storeId: Number(formData.storeId),
        dateSold: new Date().toISOString()
        };

        console.log("payload to send:", payload);

        const res = await api.post("/sales", payload);
        console.log("response:", res.data);

        setIsModalOpen(false);
        fetchSales();
    } catch (err) {
        console.error("Failed to save sale:", err.response?.data || err.message);
        alert("Error saving sale. Please check your input.");
    }
    };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this sale?")) return;
    await api.delete(`/sales/${id}`);
    fetchSales();
  };

  return (
    <div className="p-8">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-semibold">Sales Management</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Add Sale
        </button>
      </div>

      <table className="min-w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Customer</th>
            <th className="border px-4 py-2">Product</th>
            <th className="border px-4 py-2">Store</th>
            <th className="border px-4 py-2">Date Sold</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {sales.map((s) => (
            <tr key={s.id}>
              <td className="border px-4 py-2">{s.id}</td>
              <td className="border px-4 py-2">{s.customer?.name}</td>
              <td className="border px-4 py-2">{s.product?.name}</td>
              <td className="border px-4 py-2">{s.store?.name}</td>
              <td className="border px-4 py-2">
                {new Date(s.dateSold).toLocaleDateString()}
              </td>
              <td className="border px-4 py-2 space-x-2">
                <button
                  onClick={() => handleDelete(s.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Add New Sale</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="number"
                placeholder="Customer ID"
                value={formData.customerId}
                onChange={(e) =>
                  setFormData({ ...formData, customerId: e.target.value })
                }
                className="w-full border rounded px-3 py-2"
                required
              />
              <input
                type="number"
                placeholder="Product ID"
                value={formData.productId}
                onChange={(e) =>
                  setFormData({ ...formData, productId: e.target.value })
                }
                className="w-full border rounded px-3 py-2"
                required
              />
              <input
                type="number"
                placeholder="Store ID"
                value={formData.storeId}
                onChange={(e) =>
                  setFormData({ ...formData, storeId: e.target.value })
                }
                className="w-full border rounded px-3 py-2"
                required
              />
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Save
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SalePage;