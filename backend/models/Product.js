import { DataTypes } from "sequelize";
import sequelize from "../database/db.js";

export const Product = sequelize.define("Product", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: { notEmpty: { msg: "Product name is required" } },
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      isDecimal: { msg: "Price must be a number" },
      min: { args: [0], msg: "Price must be >= 0" },
    },
  },
});