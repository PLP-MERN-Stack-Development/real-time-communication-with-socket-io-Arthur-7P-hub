💬 Real-Time Communication with Socket.io
📘 Project Overview

This project demonstrates a real-time chat application built using the MERN stack and Socket.io.
It allows multiple users to send and receive messages instantly through a live WebSocket connection.

🏗️ Tech Stack

Frontend: React (Vite/CRA)
Backend: Node.js + Express
Real-Time Engine: Socket.io
Language: JavaScript (ES6)

⚙️ Installation & Setup
1️⃣ Clone the repository
git clone https://github.com/<your-classroom-repo-link>.git
cd real-time-communication-with-socket-io-Arthur-7P-hub

2️⃣ Backend Setup (Server)
cd server
npm install
npm run dev


Server will start on:
👉 http://localhost:5000

3️⃣ Frontend Setup (Client)

Open a new terminal (or split one in VS Code):

cd client
npm install
npm start


Client will start on:
👉 http://localhost:3000

⚡ How It Works

The server initializes a Socket.io connection.

Each connected client is assigned a socket ID.

When a user sends a message, it’s broadcasted in real-time to all connected clients.

All users instantly see new messages appear without refreshing.

📁 Project Structure
real-time-communication-with-socket-io-Arthur-7P-hub/
├── server/
│   ├── index.js
│   └── package.json
│
├── client/
│   ├── src/
│   │   ├── App.js
│   │   ├── index.js
│   │   ├── socket/
│   │   │   └── socket.js
│   │   ├── context/
│   │   ├── hooks/
│   │   └── pages/
│   └── package.json
│
└── README.md

🧠 Key Features

✅ Real-time two-way communication
✅ Simple and intuitive chat interface
✅ Socket.io event handling on both server & client
✅ Modular and scalable MERN structure