# 🧑‍🎨 Collaborative Whiteboard App

A real-time collaborative whiteboard built with the **MERN** stack and **Socket.IO** for live drawing and cursor sharing between users — without any authentication. Just share a room code and draw together!

---

## 🚀 Project Overview

This project is a whiteboard web application that allows multiple users to join a shared room and draw together in real time. Users can join rooms by entering simple alphanumeric codes, and all drawing and cursor movements are synchronized across connected users instantly.

---

## ⚙️ Tech Stack

| Layer         | Technology         |
|---------------|--------------------|
| Frontend      | React.js           |
| Backend       | Node.js + Express  |
| Database      | MongoDB            |
| Real-time     | Socket.IO          |
| Styling       | Tailwind CSS / CSS |

---

## ✨ Features

### ✅ Room Management
- Enter a 6–8 character alphanumeric room code to join
- No login or registration required
- If room doesn't exist, it gets created dynamically

### ✅ Drawing Features
- Pencil tool (black, red, blue, green)
- Adjustable stroke width with slider
- Clear canvas button
- Smooth line drawing using HTML5 Canvas

### ✅ Real-time Collaboration
- Live drawing sync across all connected users
- Real-time cursor tracking with unique user colors
- Live user count for each room
- All tabs stay in sync using `BroadcastChannel` API

---

## 🗂️ Folder Structure

project-root/
├── client/ # React frontend
│ ├── src/
│ │ ├── components/
│ │ │ ├── RoomJoin.jsx
│ │ │ ├── Whiteboard.jsx
│ │ │ ├── DrawingCanvas.jsx
│ │ │ ├── Toolbar.jsx
│ │ │ └── UserCursors.jsx
│ │ ├── socket.js
│ │ └── App.js
│ └── package.json
├── server/ # Express + Socket.IO backend
│ ├── models/
│ │ └── Room.js
│ ├── routes/
│ │ └── roomRoutes.js
│ ├── socket/
│ │ └── socketHandlers.js
│ ├── server.js
│ └── package.json
├── README.md
