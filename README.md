# Mobile Store App

This is a full-stack web application for managing and displaying charging stations. It includes user authentication, station CRUD operations for admins, and a UI built with React and Tailwind CSS.

---

## 🛠 Tech Stack

- **Frontend:** React, Tailwind CSS, Vite, Redux
- **Backend:** Node.js, Express, Sequelize, PostgreSQL
- **Authentication:** JWT

---

## 📁 Project Structure

```
mobile-store/
├── backend/
└── frontend/
```

---

## 🚀 Getting Started

### 🔧 Backend Setup

1. Navigate to the backend directory:

   ```bash
   cd backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file inside the `backend` directory and add the following environment variables:

   ```env
   PORT=5000
   DB_USER=postgres
   DB_PASSWORD=""
   DB_NAME=
   DB_HOST=localhost
   JWT_SECRET=""
   ```

4. Start the backend server:

   ```bash
   npm run dev
   ```

> Ensure PostgreSQL is running and a database named `charge-app` exists.

---

### 🎨 Frontend Setup

1. Navigate to the frontend directory:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the frontend development server:

   ```bash
   npm run dev
   ```

> The frontend will run on `http://localhost:5173` (default Vite port).

---

## 📌 Notes

- Default admin routes require a user with role `"admin"`.
- Stations created by an admin will be filtered accordingly.
- All stations can be viewed using the `/all` route.

---

## 📜 License

This project is licensed for educational purposes.

