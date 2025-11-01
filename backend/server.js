import express from "express";
import cors from "cors";
import sequelize from "./database/db.js";

// 导入模型（确保 Sequelize 知道要创建这些表）
import "./models/Customer.js";
import "./models/Product.js";
import "./models/Store.js";
import "./models/Sale.js";
import "./models/associations.js";

// 导入路由
import customerRoutes from "./routes/customerRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import storeRoutes from "./routes/storeRoutes.js";
import salesRoutes from "./routes/salesRoutes.js";

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();

// 允许跨域访问（前端可访问）
app.use(cors());

// 解析 JSON 请求体
app.use(express.json());

// 注册路由
app.use("/api/customers", customerRoutes);
app.use("/api/products", productRoutes);
app.use("/api/stores", storeRoutes);
app.use("/api/sale", salesRoutes);

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

// 启动服务器
const PORT = 5000;

// 同步数据库并启动服务
// 首次运行建表：仅第一次置为 true，之后设回 false
const FIRST_RUN = false;

import applyAssociations from "./models/associations.js"; // 导入模型关联设置

(async () => {
  try {
    if (FIRST_RUN) {
      // 建立表结构并应用关联
      applyAssociations(); // 在 sync 之前调用
      await sequelize.sync({ alter: true }); // 或 { force: true } 清空重建
      console.log("✅ Database synced (FIRST_RUN).");
    } else {
      await sequelize.authenticate();
      console.log("✅ Database connection OK.");
    }

    app.listen(PORT, () => {
      console.log(`🚀 Server is running at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("❌ DB init error:", err);
    process.exit(1);
  }
})();