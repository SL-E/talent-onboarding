import express from "express";
const router = express.Router();

// 模拟管理员账户
const ADMIN = {
  email: "admin@example.com",
  password: "123456",
};

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (email === ADMIN.email && password === ADMIN.password) {
    res.json({
      success: true,
      message: "Login successful",
      token: "mocked-jwt-token",
      user: { email: ADMIN.email },
    });
  } else {
    res.status(401).json({
      success: false,
      message: "Invalid email or password",
    });
  }
});

export default router;