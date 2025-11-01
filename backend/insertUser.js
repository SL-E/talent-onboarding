import sequelize from "./database/db.js";
import { User } from "./models/User.js";

const insertUser = async () => {
  try {
    await sequelize.sync(); // 确保数据库和模型同步
    await User.create({
      name: "Edward Li",
      email: "admin@example.com",
      password: "123456"
    });
    console.log("✅ User inserted successfully!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error inserting user:", err);
    process.exit(1);
  }
};

insertUser();