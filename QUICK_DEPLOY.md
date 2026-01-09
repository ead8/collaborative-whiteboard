# Quick Deployment Guide

## 🎯 Fastest Way to Deploy

### 1. MongoDB Atlas Setup (5 minutes)

1. Visit: https://www.mongodb.com/cloud/atlas/register
2. Create free account → Create free cluster (M0)
3. Create database user:
   - Database Access → Add New User
   - Username: `whiteboard-user`
   - Password: Click "Autogenerate Secure Password" (SAVE IT!)
4. Network Access:
   - Network Access → Add IP Address
   - Click "Allow Access from Anywhere" (0.0.0.0/0)
5. Get connection string:
   - Database → Connect → Connect your application
   - Copy the connection string
   - Replace `<password>` with your saved password
   - Example: `mongodb+srv://whiteboard-user:abc123@cluster0.xxxxx.mongodb.net/whiteboard?retryWrites=true&w=majority`

---

### 2. Deploy Server to Railway (5 minutes)

1. Visit: https://railway.app
2. Sign up with GitHub
3. New Project → Deploy from GitHub repo
4. Select your repository
5. Settings → Variables:
   ```
   PORT = 8000
   MONGODB_URI = (paste your MongoDB connection string)
   ```
6. Deployments → Wait for deployment
7. Copy your Railway URL (e.g., `https://your-app.railway.app`)

---

### 3. Deploy Client to Vercel (3 minutes)

1. Visit: https://vercel.com
2. Sign up with GitHub
3. New Project → Import repository
4. Configure:
   - **Root Directory**: `client`
   - **Framework**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Environment Variables:
   ```
   VITE_BACKEND_URL = (paste your Railway URL)
   ```
6. Deploy!

---

## ✅ Done!

Your app is live! Visit your Vercel URL to test.

**Note**: For Socket.IO to work properly, the server MUST be on Railway (or similar platform that supports WebSockets). Vercel serverless functions don't support persistent WebSocket connections.

---

## 🔄 Update Environment Variables

If you need to update environment variables later:

**Railway**: Project → Variables tab
**Vercel**: Project → Settings → Environment Variables

After updating, redeploy the service.

