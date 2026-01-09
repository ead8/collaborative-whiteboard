# Deployment Guide for Vercel

## Overview
This app has two parts:
- **Client** (React/Vite) - Frontend
- **Server** (Node.js/Express + Socket.IO) - Backend with WebSocket support

## ⚠️ Important: Socket.IO on Vercel
Vercel's serverless functions have limitations with Socket.IO because they don't support persistent WebSocket connections. You have two options:

### Option 1: Deploy Server Separately (Recommended)
Deploy the server to a platform that supports WebSockets:
- **Railway** (Recommended - Free tier available)
- **Render** (Free tier available)
- **Fly.io** (Free tier available)
- **Heroku** (Paid)

### Option 2: Use Vercel with Upstash Redis (Advanced)
Use Vercel with Redis adapter for Socket.IO (more complex setup)

---

## 🚀 Deployment Steps

### Step 1: Set Up MongoDB Atlas (Free Cloud Database)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up for a free account
3. Create a new cluster (choose FREE tier)
4. Create a database user:
   - Go to "Database Access" → "Add New Database User"
   - Username: `whiteboard-user` (or your choice)
   - Password: Generate a secure password (save it!)
5. Whitelist IP addresses:
   - Go to "Network Access" → "Add IP Address"
   - Click "Allow Access from Anywhere" (0.0.0.0/0) for development
   - For production, add specific IPs
6. Get your connection string:
   - Go to "Database" → "Connect"
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password
   - Example: `mongodb+srv://whiteboard-user:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/whiteboard?retryWrites=true&w=majority`

---

### Step 2: Deploy Server (Railway - Recommended)

1. Go to [Railway](https://railway.app)
2. Sign up with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your repository
5. Add environment variables:
   - `PORT` = `8000` (Railway will assign a port automatically, but keep this)
   - `MONGODB_URI` = Your MongoDB Atlas connection string
6. Railway will auto-detect Node.js and deploy
7. After deployment, copy your Railway URL (e.g., `https://your-app.railway.app`)

**Update server/package.json scripts:**
```json
"scripts": {
  "start": "node server.js"
}
```

---

### Step 3: Deploy Client to Vercel

1. Go to [Vercel](https://vercel.com)
2. Sign up with GitHub
3. Click "New Project" → Import your repository
4. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `client`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Add Environment Variable:
   - `VITE_BACKEND_URL` = Your Railway server URL (e.g., `https://your-app.railway.app`)
6. Deploy!

---

## 🔧 Alternative: Deploy Both to Railway

If you prefer one platform:

1. Deploy server to Railway (as above)
2. For client:
   - Create a new Railway project
   - Set root directory to `client`
   - Build command: `npm run build`
   - Start command: `npm run preview` (or use a static file server)
   - Add environment variable: `VITE_BACKEND_URL`

---

## 📝 Environment Variables Summary

### Server (.env)
```
PORT=8000
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/whiteboard?retryWrites=true&w=majority
```

### Client (.env)
```
VITE_BACKEND_URL=https://your-server-url.railway.app
```

---

## 🧪 Testing After Deployment

1. Visit your Vercel client URL
2. Create a room
3. Open the same room in another browser/incognito window
4. Test drawing - it should sync in real-time!

---

## 🔍 Troubleshooting

### Socket.IO Connection Issues
- Make sure `VITE_BACKEND_URL` in client matches your server URL exactly
- Check CORS settings in server.js
- Verify server is running and accessible

### MongoDB Connection Issues
- Check your connection string has the correct password
- Verify IP whitelist in MongoDB Atlas
- Check cluster is running (not paused)

### Build Errors
- Make sure all dependencies are in package.json
- Check Node.js version compatibility
- Review build logs for specific errors

