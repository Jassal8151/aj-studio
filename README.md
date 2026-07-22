# AJ Studio - Production-Ready MERN Photography Portfolio Website

AJ Studio is a full-stack, luxury photography portfolio website built with modern web technologies following clean MVC architecture, RESTful API design, and premium UI aesthetics.

---

## 🌟 Key Features

- **Public Gallery & Portfolio**: Category filtering, sorting (Newest/Oldest), real-time search, pagination, and fullscreen lightbox image viewer (`yet-another-react-lightbox`).
- **Cinematic Dark Aesthetics**: Fine-tuned dark luxury design system built with Tailwind CSS, custom glassmorphism, Google Fonts, and smooth Framer Motion micro-animations.
- **Client Direct Uploads**: Client-side direct unsigned Cloudinary image uploads (`React -> Cloudinary -> Backend metadata store`).
- **JWT Admin Authentication**: Single admin security model using bcrypt hashed passwords, JWT Bearer tokens, token expiry interceptors, and protected dashboard routes (`/admin/dashboard`).
- **Admin Dashboard**: Stat summary cards (Total Images, Total Categories, Total Inquiries), complete portfolio CRUD table with Add/Edit modals, and Delete confirmation dialogs.
- **Inquiry System with Nodemailer**: Interactive contact form powered by `react-hook-form` that stores inquiries in MongoDB and triggers automated Nodemailer email notifications.
- **SEO & Accessibility**: Complete Open Graph, Twitter Cards, dynamic Helmet titles, XML Sitemap, `robots.txt`, and ARIA labels.

---

## 🛠 Tech Stack

### Frontend
- **Framework**: React 19 + Vite
- **Styling**: Tailwind CSS v4 + Custom Design Utilities
- **State & Data Fetching**: TanStack React Query v5
- **HTTP Client**: Axios with JWT interceptors
- **Forms & Validation**: React Hook Form
- **Animations**: Framer Motion
- **Image Lightbox**: Yet Another React Lightbox
- **SEO**: React Helmet Async
- **Notifications**: React Hot Toast & React Icons

### Backend
- **Runtime**: Node.js (ES Modules)
- **Framework**: Express.js
- **Database**: MongoDB & Mongoose ORM
- **Authentication**: JWT & bcryptjs
- **Security**: Helmet, Cors, Express Rate Limiting
- **Email Service**: Nodemailer

---

## 📁 Repository Structure

```
AJ-Studio/
├── backend/
│   ├── config/              # Database & Nodemailer configs
│   ├── controllers/         # Auth, Portfolio & Contact controllers
│   ├── middleware/          # JWT auth protect, rate limiter, error handlers
│   ├── models/              # Mongoose Schemas (Admin, Portfolio, Contact)
│   ├── routes/              # Express API routes
│   ├── scripts/             # Admin seeding script (seedAdmin.js)
│   ├── utils/               # Token generator & email sending helpers
│   ├── app.js               # Express application initialization
│   ├── server.js            # Server entrypoint
│   └── postman_collection.json # Exportable Postman collection
├── frontend/
│   ├── public/              # Robots.txt, Sitemap.xml
│   ├── src/
│   │   ├── api/             # Axios client configuration
│   │   ├── components/      # Common, Layout, Portfolio, and Admin components
│   │   ├── constants/       # Categories, camera presets, studio info
│   │   ├── context/         # AuthContext provider
│   │   ├── hooks/           # TanStack Query & Auth custom hooks
│   │   ├── pages/           # Public pages & Admin dashboard views
│   │   ├── routes/          # AppRoutes configuration
│   │   ├── services/        # API and Cloudinary upload services
│   │   └── styles/          # Tailwind CSS design system
│   ├── index.html
│   └── vite.config.js
└── README.md
```

---

## 🚀 Quick Start & Installation

### Prerequisites
- Node.js (v18 or higher)
- MongoDB running locally (`mongodb://127.0.0.1:27017`) or MongoDB Atlas URI.

---

### Step 1: Setup Backend

```bash
cd backend
cmd /c npm install
```

Create a `.env` file in `backend/`:
```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/aj_studio_portfolio
JWT_SECRET=aj_studio_super_secret_jwt_key_2026_change_in_production
JWT_EXPIRES_IN=7d
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=admin@ajstudio.com
EMAIL_PASS=secretpassword
EMAIL_FROM=AJ Studio Portfolio <admin@ajstudio.com>
FRONTEND_URL=http://localhost:5173
NODE_ENV=development
```

#### Seed Initial Admin & Portfolio Data
Run the seeding script to create the initial admin account and sample photography items:
```bash
cmd /c npm run seed
```
- **Admin Username**: `admin@ajstudio.com`
- **Admin Password**: `admin123456`

#### Start Backend Server
```bash
cmd /c npm run dev
```
The backend API will run at `http://localhost:5000`.

---

### Step 2: Setup Frontend

```bash
cd ../frontend
cmd /c npm install
```

Create a `.env` file in `frontend/`:
```env
VITE_API_URL=http://localhost:5000/api
VITE_CLOUDINARY_CLOUD_NAME=demo
VITE_CLOUDINARY_UPLOAD_PRESET=docs_upload_example
```

#### Start Frontend Development Server
```bash
cmd /c npm run dev
```
The application will launch at `http://localhost:5173`.

---

## 🔑 Admin Dashboard Access

1. Open your browser and navigate to `http://localhost:5173/admin/login`.
2. Enter the admin credentials:
   - **Username**: `admin@ajstudio.com`
   - **Password**: `admin123456`
   *(Or click the "Autofill Seed Credentials" button on the login screen).*
3. Manage portfolio images, upload new photographs with direct Cloudinary integration, and review client inquiry submissions.

---

## 📡 API Reference Summary

### Authentication
- `POST /api/auth/login` - Admin login
- `GET /api/auth/me` - Get current admin session

### Portfolio
- `GET /api/portfolio` - Get paginated & filtered portfolio (`?category=Wedding&sort=newest&page=1&limit=12`)
- `GET /api/portfolio/:id` - Get single portfolio item
- `POST /api/portfolio` - Create new portfolio item *(Admin Protected)*
- `PUT /api/portfolio/:id` - Update portfolio item *(Admin Protected)*
- `DELETE /api/portfolio/:id` - Delete portfolio item *(Admin Protected)*

### Contact
- `POST /api/contact` - Submit client inquiry & trigger email notification
- `GET /api/contact` - Get list of submitted inquiries *(Admin Protected)*
- `PUT /api/contact/:id` - Update inquiry status *(Admin Protected)*

---

## 📄 License
This project is released under the MIT License.
