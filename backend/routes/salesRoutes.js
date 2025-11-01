// backend/routes/salesRoutes.js
import express from "express";
import { Sale } from "../models/Sale.js";
import { Customer } from "../models/Customer.js";
import { Product } from "../models/Product.js";
import { Store } from "../models/Store.js";

const router = express.Router();

/**
 * 🟢 获取所有销售记录
 * 关联查询：返回销售记录时一并显示 Customer / Product / Store 的信息
 */
router.get("/", async (req, res) => {
  try {
    const sales = await Sale.findAll({
      include: [Customer, Product, Store],
    });
    res.json(sales);
  } catch (err) {
    console.error("❌ Error fetching sales:", err);
    res.status(500).json({ error: "Failed to fetch sales." });
  }
});

/**
 * 🟡 创建新销售记录
 * Body 示例：
 * {
 *   "dateSold": "2025-10-31",
 *   "quantity": 2,
 *   "totalPrice": 150.00,
 *   "customerId": 1,
 *   "productId": 1,
 *   "storeId": 1
 * }
 */
router.post("/", async (req, res) => {
  try {
    const { dateSold, quantity, totalPrice, customerId, productId, storeId } = req.body;

    if (!dateSold || !quantity || !totalPrice || !customerId || !productId || !storeId) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const sale = await Sale.create({ dateSold, quantity, totalPrice, customerId, productId, storeId });
    res.status(201).json(sale);
  } catch (err) {
    console.error("❌ Error creating sale:", err);
    res.status(500).json({ error: "Failed to create sale." });
  }
});

/**
 * 🔵 更新销售记录
 */
router.put("/:id", async (req, res) => {
  try {
    const sale = await Sale.findByPk(req.params.id);
    if (!sale) return res.status(404).json({ error: "Sale not found." });

    await sale.update(req.body);
    res.json(sale);
  } catch (err) {
    console.error("❌ Error updating sale:", err);
    res.status(500).json({ error: "Failed to update sale." });
  }
});

/**
 * 🔴 删除销售记录
 */
router.delete("/:id", async (req, res) => {
  try {
    const sale = await Sale.findByPk(req.params.id);
    if (!sale) return res.status(404).json({ error: "Sale not found." });

    await sale.destroy();
    res.json({ message: "Sale deleted successfully." });
  } catch (err) {
    console.error("❌ Error deleting sale:", err);
    res.status(500).json({ error: "Failed to delete sale." });
  }
});

export default router;