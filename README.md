# GlobeTrotter - Travel Planning Application

GlobeTrotter is a complete, visually spectacular, and fully interactive local prototype designed for modern travelers. It enables users to discover destinations, build detailed day-by-day itineraries, track budgets, visualize their journeys on a calendar, and share their travel plans with a vibrant community.

**Live Demo**: [Local Prototype - Run Locally]

---

## 🚀 Key Features

* **Premium UI/UX Design**: Sleek, modern interface tailored using a custom Tailwind CSS color palette (Slate, Brand Blue, and Accent Amber).
* **Interactive Trip Builder**: A comprehensive workspace to build itineraries. Includes a chronological timeline of activities, a dedicated budget tracker, and a visual calendar representation.
* **Dynamic Dashboards**: Real-time stats on the user dashboard alongside a Community Hub feed to explore public itineraries.
* **Admin Analytics Panel**: Operational dashboard for platform managers featuring dynamic visual charts built with Recharts.
* **Local State Persistence**: Seamless interactions powered by React Context API with data safely persisted in the browser.

---

## 🛠️ Tech Stack

* **Frontend**: React.js, Vite
* **Styling**: Tailwind CSS v4, PostCSS
* **Icons**: Lucide React
* **Charts**: Recharts
* **State Management**: React Context API

---

## 🌐 Production Deployment

While this prototype is designed to run flawlessly on a local machine without external APIs, the application is fully static and production-ready. 

Run 
pm run build to generate the optimized static assets in the dist/ directory, which can be immediately hosted on Vercel, Netlify, or GitHub Pages.

---

## 🔧 Local Quick Start Guide

### 1. Prerequisites
Ensure you have Node.js installed.

### 2. Install Dependencies
\\\ash
npm install
\\\

### 3. Start Development Server
\\\ash
npm run dev
\\\

### 4. Login
Open http://localhost:5173/ in your browser. 
* **Register/Login** with any mock credentials
* **Or** simply click **"Continue as Demo User"**

---

## 📂 Project Architecture

* \src/App.jsx\ - Core routing and layout wrappers.
* \src/store/\ - Global state management.
* \src/pages/\ - Main views (Dashboard, TripBuilder, CommunityHub, Admin, Profile, Login).
* \src/components/\ - Reusable UI elements.
* \src/data/\ - Seeded mock data.
