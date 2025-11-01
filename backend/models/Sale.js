import { DataTypes } from "sequelize";
import sequelize from "../database/db.js";

export const Sale = sequelize.define("Sale", {
  // 销售日期
  dateSold: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    validate: {
      isDate: { msg: "dateSold must be a valid date (YYYY-MM-DD)" },
    },
  },
  // 销售数量
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      isInt: { msg: "Quantity must be an integer" },
      min: { args: [1], msg: "Quantity must be at least 1" },
    },
  },
  // 总价（自动计算也可以手动传）
  totalPrice: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      isDecimal: { msg: "Total price must be a number" },
      min: { args: [0], msg: "Total price must be >= 0" },
    },
  },
});