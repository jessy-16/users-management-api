
## 📌 Users & Movies Management API

This project is a RESTful API built with **Node.js, Express, Prisma ORM, and PostgreSQL**.

It allows managing users and movies with full CRUD operations, authentication, and secure access control. 

Backend API project demonstrating authentication, database modeling, and RESTful architecture.

---

## 🚀 Features

### 👤 Users
- User registration and login
- JWT authentication
- Get authenticated user profile (`/auth/me`)
- Full CRUD operations
- Pagination support

### 🎬 Movies
- Create, read, update, delete movies
- Search movies by title and genre
- Protected routes with authentication
- Pagination support

---

## 🔐 Security
- Password hashing with **bcrypt**
- Authentication using **JWT**
- Protected routes via middleware
- Sensitive data (passwords) excluded from API responses

---

## 🛠 Tech Stack
- Node.js
- Express.js
- Prisma ORM
- PostgreSQL
- JWT
- bcrypt

---

## 📂 Architecture
Routes → Controllers → Services → Database

---

## ⚙️ Setup
```bash
npm install
npx prisma migrate dev
npm run dev
