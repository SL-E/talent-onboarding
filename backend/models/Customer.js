import { DataTypes } from "sequelize";
import sequelize from "../database/db.js";

export const Customer = sequelize.define("Customer", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: { notEmpty: { msg: "Customer name is required" } },
  },
  address: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});