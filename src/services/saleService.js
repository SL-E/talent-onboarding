import api from "./api";

export const getSales = () => api.get("/Sale");
export const getSale = (id) => api.get(`/Sale/${id}`);
export const addSale = (data) => api.post("/Sale", data);
export const updateSale = (id, data) => api.put(`/Sale/${id}`, data);
export const deleteSale = (id) => api.delete(`/Sale/${id}`);