import express from "express";
import { User } from "../models/User.js"; // 你需要先在 models 文件夹中创建 User 模型

const router = express.Router();

// ✅ 获取所有用户
router.get("/", async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    console.error("❌ Error fetching users:", err);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

// ✅ 创建新用户（检测重复邮箱 + 友好报错）
router.post("/", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 检查字段是否完整
    if (!name || !email || !password) {
      return res.status(400).json({ error: "Name, email, and password are required." });
    }

    // 检查邮箱是否已存在
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "This email is already registered." });
    }

    // 创建新用户
    const newUser = await User.create({ name, email, password });
    res.status(201).json(newUser);

  } catch (err) {
    console.error("❌ Error creating user:", err);
    res.status(500).json({ error: "Failed to create user. Please try again later." });
  }
});

// ✅ 删除用户
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ error: "User not found" });

    await user.destroy();
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete user" });
  }
});

export default router;