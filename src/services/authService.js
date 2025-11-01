import api from "./api";

export const login = async (email, password) => {
  try {
    const response = await api.post("/auth/login", { email, password });
    return response.data; // 返回后端响应
  } catch (error) {
    // 如果后端返回 401 或 500 等错误，打印并返回 null
    console.error("❌ Login failed:", error.response?.data || error.message);
    throw error.response?.data || { message: "Network Error" };
  }
};