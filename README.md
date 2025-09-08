# Library Management System

A full-stack web application for managing library operations, built with **React.js** (frontend) and **Node.js/Express** (backend) with **MongoDB**.

---

## 🌟 Features

### Backend Features
- RESTful API design with Express.js  
- MongoDB database with Mongoose ODM  
- JWT-based authentication system  
- Role-based access control (Admin/Member)  
- Book management (CRUD operations)  
- Borrow/return functionality  
- API documentation with Swagger  

### Frontend Features
- Responsive React.js application with Vite  
- User authentication (login/register)  
- Book browsing with search functionality  
- Borrow and return operations  
- User dashboard with borrow history  
- Admin dashboard with statistics  
- Modern UI with Tailwind CSS  

---

## 🛠️ Tech Stack

### Backend
- **Runtime:** Node.js  
- **Framework:** Express.js  
- **Database:** MongoDB with Mongoose  
- **Authentication:** JWT (JSON Web Tokens)  
- **Documentation:** Swagger/OpenAPI  

### Frontend
- **Framework:** React.js with Vite  
- **Styling:** Tailwind CSS  
- **Routing:** React Router  
- **HTTP Client:** Axios  
- **State Management:** React Context API  
- **Notifications:** React Toastify  

---

## 📦 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)  
- MongoDB (local installation or MongoDB Atlas account)  
- npm or yarn package manager  

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd library-backend


Install dependencies:

npm install


Create a .env file in the backend directory:

PORT=5000
MONGODB_URI=mongodb://localhost:27017/library_db
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=7d


Start the backend server:

npm run dev


The backend API will be available at http://localhost:5000
API documentation will be available at http://localhost:5000/api-docs

Frontend Setup

Navigate to the frontend directory:

cd library-frontend


Install dependencies:

npm install


Start the development server:

npm run dev


The frontend application will be available at http://localhost:3000





