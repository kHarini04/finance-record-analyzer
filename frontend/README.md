 Finance Dashboard

A full-stack Finance Dashboard with role-based access where admins manage users & records, and viewers/analysts view analytics.

Features
JWT Authentication (Login/Register)
Role-Based Access (Admin, Analyst, Viewer)
Dashboard with Income vs Expense charts
Record Management (Add, Edit, Delete)
User Management (Admin only)
Search & Filter functionality
Tech Stack

Frontend: Next.js, Tailwind CSS, Axios, Chart.js
Backend: Node.js, Express.js, Prisma (v7), PostgreSQL

Setup
Backend
cd backend
npm install
npx prisma generate
npx prisma migrate dev
npx prisma db seed
npm run dev

Frontend
cd frontend
npm install
npm run dev

Default Admin
Email: harini@gmail.com
Password: harini09

API
Auth → /api/auth
Users → /api/users
Records → /api/records
Dashboard → /api/dashboard

Architecture

Frontend → API → Controller → Service → Prisma → DB
