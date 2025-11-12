import api from "./api";

export const getProducts = () => api.get("/Product");
export const getProduct = (id) => api.get(`/Product/${id}`);
export const addProduct = (data) => api.post("/Product", data);
export const updateProduct = (id, data) => api.put(`/Product/${id}`, data);
export const deleteProduct = (id) => api.delete(`/Product/${id}`);