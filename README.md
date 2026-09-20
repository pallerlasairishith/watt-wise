# WattWise AI
Full-stack energy monitoring and optimization app.

Features: React/Vite dashboard, Vercel API, SQLite-compatible better-sqlite3 storage, appliance controls, live polling, bill calculation, AI-style insights, high-load optimization, activity history, sensor reading API, responsive glassmorphism UI.

Run: npm install && npm run dev

API: GET /api/energy; POST /api/energy actions toggle, optimize, reading, event.

Database is stored in /tmp for the no-external-database demo. Vercel serverless storage is ephemeral; use persistent storage for production.