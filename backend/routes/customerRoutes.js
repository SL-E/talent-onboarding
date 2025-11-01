import express from "express";
import { Customer } from "../models/Customer.js";

const router = express.Router();

// List
router.get("/", async (req, res) => {
  try {
    const customers = await Customer.findAll({ order: [["id", "ASC"]] });
    res.json(customers);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Failed to fetch customers" });
  }
});

// Get by id
router.get("/:id", async (req, res) => {
  try {
    const c = await Customer.findByPk(req.params.id);
    if (!c) return res.status(404).json({ error: "Customer not found" });
    res.json(c);
  } catch (e) {
    res.status(500).json({ error: "Failed to fetch customer" });
  }
});

// Create
router.post("/", async (req, res) => {
  try {
    const { name, address } = req.body;
    if (!name) return res.status(400).json({ error: "Name is required" });
    const created = await Customer.create({ name, address });
    res.status(201).json(created);
  } catch (e) {
    res.status(500).json({ error: "Failed to create customer" });
  }
});

// Update
router.put("/:id", async (req, res) => {
  try {
    const c = await Customer.findByPk(req.params.id);
    if (!c) return res.status(404).json({ error: "Customer not found" });
    const { name, address } = req.body;
    await c.update({ name: name ?? c.name, address: address ?? c.address });
    res.json(c);
  } catch (e) {
    res.status(500).json({ error: "Failed to update customer" });
  }
});

// Delete
router.delete("/:id", async (req, res) => {
  try {
    const c = await Customer.findByPk(req.params.id);
    if (!c) return res.status(404).json({ error: "Customer not found" });
    await c.destroy();
    res.json({ message: "Customer deleted" });
  } catch (e) {
    res.status(500).json({ error: "Failed to delete customer (maybe has sales)" });
  }
});

export default router;