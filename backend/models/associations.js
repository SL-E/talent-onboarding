import { Customer } from "./Customer.js";
import { Product } from "./Product.js";
import { Store } from "./Store.js";
import { Sale } from "./Sale.js";

// Customer 与 Sale（1 对多）
Customer.hasMany(Sale, { foreignKey: "customerId", onDelete: "CASCADE" });
Sale.belongsTo(Customer, { foreignKey: "customerId" });

// Product 与 Sale（1 对多）
Product.hasMany(Sale, { foreignKey: "productId", onDelete: "CASCADE" });
Sale.belongsTo(Product, { foreignKey: "productId" });

// Store 与 Sale（1 对多）
Store.hasMany(Sale, { foreignKey: "storeId", onDelete: "CASCADE" });
Sale.belongsTo(Store, { foreignKey: "storeId" });

// 导出（供 server.js 引入，建立表关系）
export default function applyAssociations() {
  console.log("✅ Associations between models have been set up!");
}