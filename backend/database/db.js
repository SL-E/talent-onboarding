import { fileURLToPath } from "url";
import path from "path";
import { Sequelize } from "sequelize";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ 改成固定路径，确保始终在 backend/database/ 下
const dbPath = path.resolve(__dirname, "talent_onboarding.db");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: dbPath,
  logging: false,
});

export default sequelize;