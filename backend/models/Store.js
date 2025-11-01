import { DataTypes } from "sequelize";
import sequelize from "../database/db.js";

export const Store = sequelize.define("Store", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // 防止重复门店
    validate: {
      notEmpty: { msg: "Store name is required" },
      len: {
        args: [2, 100],
        msg: "Store name must be between 2 and 100 characters",
      },
    },
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: "City name is required" },
      isAlpha: {
        args: true,
        msg: "City name should only contain letters",
      },
    },
  },
});