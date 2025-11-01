// routes/storeRoutes.js
import express from "express";
import { Store } from "../models/Store.js";

const router = express.Router();

// ✅ 获取所有门店
router.get("/", async (req, res) => {
  try {
    const stores = await Store.findAll();
    res.json(stores);
  } catch (err) {
    console.error("❌ Error fetching stores:", err);
    res.status(500).json({ error: "Failed to fetch stores" });
  }
});

// ✅ 新增门店
router.post("/", async (req, res) => {
  try {
    const { name, city } = req.body;
    const newStore = await Store.create({ name, city });
    res.status(201).json(newStore);
  } catch (err) {
    console.error("❌ Error creating store:", err);
    res.status(500).json({ error: "Failed to create store" });
  }
});

// ✅ 更新门店
router.put("/:id", async (req, res) => {
  try {
    const store = await Store.findByPk(req.params.id);
    if (!store) return res.status(404).json({ error: "Store not found" });

    const { name, city } = req.body;
    await store.update({ name, city });
    res.json(store);
  } catch (err) {
    console.error("❌ Error updating store:", err);
    res.status(500).json({ error: "Failed to update store" });
  }
});

// ✅ 删除门店
router.delete("/:id", async (req, res) => {
  try {
    const store = await Store.findByPk(req.params.id);
    if (!store) return res.status(404).json({ error: "Store not found" });

    await store.destroy();
    res.json({ message: "Store deleted successfully" });
  } catch (err) {
    console.error("❌ Error deleting store:", err);
    res.status(500).json({ error: "Failed to delete store" });
  }
});

export default router;