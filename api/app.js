import dotenv from 'dotenv';
dotenv.config();

import express from "express";
import cors from 'cors';
import cookieParser from 'cookie-parser';
import http from 'http';
import { Server } from 'socket.io';

import authRoute from "./routes/auth.route.js";
import postRoute from "./routes/post.route.js";
import testRoute from "./routes/test.route.js";
import userRoute from "./routes/user.route.js";
import chatRoute from "./routes/chat.route.js";
import messageRoute from "./routes/message.route.js";


const app = express();
const server = http.createServer(app); // Create an HTTP server
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173', // Allow your frontend origin
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

console.log('DATABASE_URL:', process.env.DATABASE_URL);

// Routes
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);
app.use("/api/test", testRoute);
app.use("/api/users", userRoute);
app.use("/api/chats", chatRoute);
app.use("/api/messages", messageRoute);


// // Socket.IO connection
// io.on('connection', (socket) => {
//   console.log('New client connected');
//   socket.on('newUser', (userId) => {
//     console.log(`User ${userId} has joined`);
//   });

//   socket.on('disconnect', () => {
//     console.log('Client disconnected');
//   });
// });

 server.listen(8800, () => {
   console.log("Server is running on port 8800");
 });
