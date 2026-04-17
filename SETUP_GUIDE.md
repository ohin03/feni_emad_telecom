1. Basic Setup Info

Backend: Port 5152

Frontend: Port 3000

DB: MongoDB Atlas

API Root: http://localhost:5152/api/v1

2. How to Start the Project
The easiest way is to just run one command and it’ll handle both:

Bash
npm run dev
If you prefer separate terminals:

For Backend: npm run server

For Frontend: npm run client

Once you see Server running on port 5152, you're good to go.

3. Making Someone an Admin (The Role System)

Quickest way: Go to MongoDB Atlas, find the user in the users collection, and manually change the role value to 1. (By default, it's 0 for normal users).

Standard way: 1. Register a new account on the site (/register).
2. Go to the DB and flip the role from 0 to 1.
3. Login again, and you’ll have access to the admin dashboard.

4. Common Issues (Troubleshooting)

Proxy Error: This almost always means the backend isn't running. Double-check if you started the server.

MongoDB Not Connecting: Check your internet or see if the MONGO_URL in the .env file is correct.

Port 5152 already in use: Something is stuck on that port. Either kill the process or just restart your code editor/PC.

5. Folder Structure (Simplified)

controllers/ — All the main logic/functions are here.

routes/ — Defines the API endpoints.

models/ — The database schemas (how data is structured).

client/ — This is where the React (Frontend) code lives.

Quick Commands List:

npm run dev (Starts everything)

npm run server (Backend only)

npm run client (Frontend only)