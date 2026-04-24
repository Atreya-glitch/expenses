# Expense Tracker App

A full-stack mobile application built with React Native (Expo), Node.js, Express, and MongoDB.

## Features
- **User Authentication**: Secure JWT-based login and registration.
- **Expense Management**: Add, edit, and delete expense records with amount, category, date, and notes.
- **Dashboard**: A premium, dark-themed dashboard with a category-wise summary and recent transactions.
- **State Management**: React Context API for clean and efficient state handling across the app.
- **API Integration**: RESTful API built with Node.js and MongoDB.
- **Premium UI**: Custom-designed interface using modern glassmorphism principles and a vibrant color palette.

## Tech Stack
- **Frontend**: React Native, Expo, React Navigation, Axios, Lucide Icons.
- **Backend**: Node.js, Express.js, MongoDB (Mongoose), JWT, BcryptJS.

## Prerequisites
- Node.js installed on your machine.
- Expo Go app on your mobile device (to preview the app).
- A MongoDB cluster or local MongoDB instance.

## Setup Instructions

### 1. Backend Setup
1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file (if not already present) and configure your variables:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```
4. Start the server:
   ```bash
   npm start
   ```

### 2. Frontend Setup
1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. **Important**: Update the `API_URL` in `src/context/AuthContext.js` and `src/context/ExpenseContext.js` to your machine's local IP address (e.g., `http://192.168.1.5:5000/api`) if testing on a physical device.
4. Start the Expo app:
   ```bash
   npx expo start
   ```
5. Scan the QR code with the Expo Go app.

## Project Structure
```text
├── backend/
│   ├── middleware/       # JWT Auth middleware
│   ├── models/           # Mongoose schemas (User, Expense)
│   ├── routes/           # API routes
│   └── index.js          # Entry point
├── frontend/
│   ├── src/
│   │   ├── components/   # Reusable UI components
│   │   ├── context/      # Auth and Expense contexts
│   │   ├── navigation/   # Navigation logic
│   │   ├── screens/      # Main application screens
│   │   └── theme/        # Color system
│   └── App.js            # Frontend entry point
└── README.md
```

## Problem Solving & Design Decisions
- **Consistency**: Used a unified design system in `theme/colors.js` to ensure the app feels premium and cohesive.
- **Security**: Implemented `SecureStore` in the frontend to store JWT tokens securely.
- **UX**: Added refresh controls and loading states to keep the user informed during network requests.
- **Custom Design**: Avoided generic UI libraries; instead, used custom-styled touchables and inputs for a unique look.
