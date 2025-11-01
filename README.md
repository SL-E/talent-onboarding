# 🧠 Talent Onboarding Management System (Sample Project)

This project is a full-stack demo for managing customers, products, stores, and sales records.  
It is designed as a professional example of full-stack CRUD development using modern JavaScript technologies.

---

## ⚙️ Tech Stack
**Backend:** Node.js + Express + Sequelize + SQLite  
**Frontend:** React (under `/src`)  
**API Testing:** Postman  

---

## 🚀 Getting Started

### 1️⃣ Clone the Project
```bash
git clone <your-repo-url>
cd SAMPLE-REACT
```

### 2️⃣ Install Dependencies
```bash
cd backend
npm install
```

### 3️⃣ Start the Backend Server
```bash
node server.js
```
Then open **http://localhost:5000** in your browser.

You should see:
```json
[]
```
when visiting endpoints like `/api/customers`.

---

## 🧪 API Testing (Postman)

All API endpoints can be tested using the provided Postman collection.

### Steps:
1. Open **Postman**
2. Click **Import**
3. Select:
   ```
   postman/Talent_Onboarding_API.postman_collection.json
   ```
4. Start your backend server (`node server.js`)
5. You can now test CRUD requests for:
   - ✅ Customers
   - ✅ Products
   - ✅ Stores
   - ✅ Sales

### Example:
#### Create Customer (POST)
**URL:** `http://localhost:5000/api/customers`  
**Body (JSON):**
```json
{
  "name": "Alice",
  "address": "Queen Street"
}
```

#### Create Sale (POST)
**URL:** `http://localhost:5000/api/sales`  
**Body (JSON):**
```json
{
  "productId": 1,
  "customerId": 1,
  "storeId": 1,
  "dateSold": "2025-10-24"
}
```

---

## 🧰 Database Info

- Database file: `backend/database/talent_onboarding.db`
- Automatically created when the backend runs.
- To view or modify data, you can use:
  - **DB Browser for SQLite**
  - **SQLite VS Code Extension**

---

## 📂 Project Structure

```
SAMPLE-REACT/
│
├── backend/
│   ├── database/
│   │   └── db.js
│   ├── models/
│   │   ├── Customer.js
│   │   ├── Product.js
│   │   ├── Store.js
│   │   └── Sales.js
│   ├── routes/
│   │   ├── customerRoutes.js
│   │   ├── productRoutes.js
│   │   ├── storeRoutes.js
│   │   └── salesRoutes.js
│   └── server.js
│
├── postman/
│   └── Talent_Onboarding_API.postman_collection.json
│
├── src/
│   ├── components/
│   ├── pages/
│   └── App.js
│
└── README.md
```

---

## 🧱 API Overview

| Resource | Method | Endpoint | Description |
|-----------|---------|-----------|-------------|
| Customer | GET | `/api/customers` | Get all customers |
| Customer | POST | `/api/customers` | Add new customer |
| Customer | PUT | `/api/customers/:id` | Update a customer |
| Customer | DELETE | `/api/customers/:id` | Delete a customer |
| Product | GET | `/api/products` | Get all products |
| Product | POST | `/api/products` | Add new product |
| Store | GET | `/api/stores` | Get all stores |
| Sale | POST | `/api/sales` | Add new sale record |

---

## 💡 Notes

- Ensure **Node.js v18+** is installed.
- The database automatically syncs when the server starts.
- You can easily connect this backend to a React frontend or deploy it to services like **Render**, **Railway**, or **Vercel**.

---

## 👤 Author
**Edward Li**  
Master of Information Technology, University of Waikato  
📍 Based in Auckland, New Zealand  
📅 Project Date: October 2025  
📁 Version: 1.0.0

---

✨ *“Build efficiently, test intelligently, and grow continuously.”*
