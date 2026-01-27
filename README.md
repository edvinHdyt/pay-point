# 💳 PayPoint — Web-Based POS (Kasir Management System)

**PayPoint** adalah sebuah website yang dirancang untuk memanagement sistem kasir pada sebuah Toko/UMKM. Website ini dibangun dengan stack MERN (Mongo DB, Express JS, React JS, dan Node JS) dan diperuntukan untuk pembelajaran. Bagian Frontend dan Backend pada website ini dipisahkan menjadi 2 dan dihubungkan dengan REST API.

---

## ✨ Fitur Utama
- 🔐 Autentikasi pengguna (Admin / Kasir)
- 📦 Manajemen produk & kategori
- 🧾 Transaksi penjualan
- 🛒 Keranjang belanja (real-time)
- 💰 Perhitungan total & kembalian
- 📊 Riwayat & laporan transaksi
- 🌙 UI modern & responsif
- ⚡ Performa optimal untuk penggunaan kasir harian

---

## 🛠️ Tech Stack

### Frontend
- **React.js**
- Vite
- Tailwind CSS
- React Router

### Backend
- **Node.js**
- **Express.js**
- JWT Authentication

### Database
- **MongoDB**
- Mongoose ODM

---

## 📁 Struktur Project (Planned)

```bash
pay-point/
│
├── frontend/          # React + Vite
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── hooks/
│   │   └── App.jsx
│   └── package.json
│
├── backend/           # Express.js API
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── middlewares/
│   └── app.js
│
└── README.md
