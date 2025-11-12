import api from "./api";

export const getStores = () => api.get("/Store");
export const getStore = (id) => api.get(`/Store/${id}`);
export const addStore = (data) => api.post("/Store", data);
export const updateStore = (id, data) => api.put(`/Store/${id}`, data);
export const deleteStore = (id) => api.delete(`/Store/${id}`);