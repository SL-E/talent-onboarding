// 保存登录信息（token + user）
export const setAuth = ({ token, user }) => {
  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user || {}));
};

// 清除登录信息
export const clearAuth = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

// 获取 token
export const getToken = () => localStorage.getItem("token");

// 获取用户信息
export const getUser = () => {
  try {
    return JSON.parse(localStorage.getItem("user") || "{}");
  } catch {
    return {};
  }
};

// 判断是否已登录
export const isAuthenticated = () => Boolean(getToken());