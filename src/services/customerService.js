import api from "./api";

export const getCustomers = () => api.get("/Customer");
export const getCustomer = (id) => api.get(`/Customer/${id}`);
export const addCustomer = (data) => api.post("/Customer", data);
export const updateCustomer = (id, data) => api.put(`/Customer/${id}`, data);
export const deleteCustomer = (id) => api.delete(`/Customer/${id}`);