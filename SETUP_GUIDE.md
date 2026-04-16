# 🚀 Project Setup & Admin Creation Guide

## ✅ Configuration Summary
- **Backend Port**: 5152
- **Frontend Port**: 3000
- **Database**: MongoDB Atlas
- **API Base**: `http://localhost:5152/api/v1`

---

## 📋 Step 1: Start the Application

### Option A: Development Mode (Recommended)
Run both server and client simultaneously:
```bash
npm run dev
```

### Option B: Separate Terminals
**Terminal 1** - Start Backend:
```bash
npm run server
```

**Terminal 2** - Start Frontend:
```bash
npm run client
```

**Wait for both to start:**
- Backend: `Server running on port 5152`
- Frontend: `webpack compiled successfully` at `http://localhost:3000`

---

## 👨‍💼 Step 2: Create Admin User

### Method 1: Direct Database Insert (Fastest)
1. Go to MongoDB Atlas: https://www.mongodb.com/cloud/atlas
2. Login with your account
3. Navigate to: **Cluster0** → **Collections** → **ecommercedemo_1** → **users**
4. Click **Insert Document** and add:

```json
{
  "name": "Admin User",
  "email": "admin@test.com",
  "password": "$2b$10$...", // Use hashed password from Method 2
  "phone": "+1234567890",
  "address": {"city": "Your City", "state": "State"},
  "answer": "Your security answer",
  "role": 1
}
```

### Method 2: Via Application UI (Recommended)
1. Register a normal user first:
   - Go to: `http://localhost:3000/register`
   - Fill the form with test data
   - Submit

2. Update role in MongoDB to `1` (admin):
   - Open: https://www.mongodb.com/products/platform/atlas
   - Find the user you just created
   - Change `role` from `0` to `1`
   - Verify the change

3. Login with admin account:
   - Go to: `http://localhost:3000/login`
   - Use the credentials you registered with
   - You should now see admin menu

### Method 3: Create Hashed Password for Manual Insert
If you want to manually create an admin with a hashed password, use Node.js:

```bash
node
```

Then in Node REPL:
```javascript
import bcrypt from 'bcrypt';

const password = 'admin123'; // Your desired password
const hashedPassword = await bcrypt.hash(password, 10);
console.log(hashedPassword);
```

Copy the hashed password and use it in your database insert.

---

## 🔑 Admin Features Access

After making a user admin (role = 1), they can access:
- Dashboard: `http://localhost:3000/dashboard/admin`
- Create Category: `http://localhost:3000/dashboard/admin/create-category`
- Create Product: `http://localhost:3000/dashboard/admin/create-product`
- Manage Products: `http://localhost:3000/dashboard/admin/products`
- Manage Users: `http://localhost:3000/dashboard/admin/users`
- Manage Orders: `http://localhost:3000/dashboard/admin/orders`

---

## ❌ Troubleshooting

### "Proxy error: Could not proxy request..."
- ✅ Backend not running
- **Solution**: Run `npm run server` in a separate terminal

### "MongoDB Connected" doesn't appear
- ✅ MongoDB URL might be wrong or connection issue
- **Solution**: Check `.env` file MONGO_URL and your internet connection

### "Cannot GET /api/v1/category/get-category"
- ✅ API routes not loaded
- **Solution**: Restart server with `npm run server`

### Port Already in Use
```bash
# Windows - Kill process on port 5152
netstat -ano | findstr :5152
taskkill /PID <PID> /F

# macOS/Linux
lsof -ti:5152 | xargs kill -9
```

---

## 📝 Quick Commands Reference
```bash
npm run dev          # Start everything
npm run server       # Backend only
npm run client       # Frontend only
npm start            # Backend only (same as server)
npm run build        # Build frontend for production
```

---

## 🗂️ Project Structure
```
demo-eco-1/
├── server.js           # Backend entry
├── .env               # Configuration
├── package.json       # Root dependencies
├── config/            # Database config
├── controllers/       # Business logic
├── routes/            # API endpoints
├── models/            # Database schemas
├── middlewares/       # Auth, validation
└── client/            # React frontend
    ├── package.json
    └── src/
        ├── components/
        ├── pages/
        ├── context/
        └── App.js
```

---

Good to go! 🎉
