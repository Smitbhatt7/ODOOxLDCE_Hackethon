GlobeTrotter - Premium Travel Planning Application
GlobeTrotter is a complete, visually spectacular, and fully interactive local prototype designed for modern travelers. It enables users to discover destinations, build detailed day-by-day itineraries, track budgets, visualize their journeys on a calendar, and share their travel plans with a vibrant community.
Live Demo: [Local Prototype - Run Locally]
---
🚀 Key Features
Premium UI/UX Design: Sleek, modern interface tailored using a custom Tailwind CSS color palette (Slate, Brand Blue, and Accent Amber), elegant typography (Playfair Display & Inter), and crisp Lucide React icons.
Interactive Trip Builder: A comprehensive workspace to build itineraries. Includes a chronological timeline of activities, a dedicated budget tracker, and a visual calendar representation of the entire journey.
Dynamic Dashboards & Hubs: Real-time stats on the user dashboard (Upcoming Trips, Recommended Destinations) alongside a Community Hub feed to explore public itineraries from other travelers.
Admin Analytics Panel: Operational dashboard for platform managers featuring dynamic visual charts (user growth line charts, popular destination bar charts, trip theme pie charts) built with Recharts.
Local State Persistence: Seamless, rapid interactions powered by React Context API with data safely persisted in the browser, eliminating the need for external database dependencies during local demos.
Smart Categorization: Automated sorting of itineraries into Ongoing, Upcoming, and Completed trips, with a dedicated Profile section for preferred destinations and travel history.
---
🛠️ Tech Stack
Frontend: React.js, Vite
Styling: Tailwind CSS v4, PostCSS
Icons: Lucide React
Charts: Recharts
Routing: React Router DOM
State Management: React Context API
Date Manipulation: date-fns
---
🌐 Production Deployment
While this prototype is designed to run flawlessly on a local machine for hackathon demonstrations without relying on external APIs, the application is fully static and production-ready for deployment on edge networks like Vercel, Netlify, or GitHub Pages.
Simply run `npm run build` to generate the highly optimized static assets in the `dist/` directory, which can be immediately hosted on any static hosting provider.
---
🔧 Local Quick Start Guide
1. Prerequisites
Ensure you have Node.js installed on your machine.
2. Install Dependencies
```bash
npm install
```
3. Start Development Server
```bash
npm run dev
```
4. Login
Open `http://localhost:5173/` in your browser. Since this is a standalone prototype, you can:
Register/Login with any mock credentials (e.g., `judge@example.com` / `123456`)
Or simply click "Continue as Demo User" to instantly access the pre-seeded account.
---
📂 Project Architecture
`src/App.jsx` - Core routing and layout wrappers.
`src/store/` - Global state management (`appStore.jsx`) providing mock data and functions.
`src/pages/` - Main views (Dashboard, TripBuilder, CommunityHub, Admin, Profile, Login).
`src/components/` - Reusable UI elements (Navbar).
`src/data/` - Seeded mock data (`cities.js`, `activities.js`, `demoTrips.js`).
`src/index.css` - Global styles and Tailwind v4 theme configuration.
`vite.config.js` - Vite bundler and plugin configuration.
