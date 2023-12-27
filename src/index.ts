import cors from 'cors';
import express from 'express';

import { Server } from 'socket.io';
import { authRoutes } from './routes/auth';
import { chatRoutes } from './routes/chat';
import { friendRoutes } from './routes/friend';
import { webSocketRoutes } from './routes/websocket';

const app = express()

app.use(cors())
app.use(express.json())
app.use("/auth", authRoutes)
app.use("/friend", friendRoutes)
app.use("/chat", chatRoutes)
const io = new Server(3002, {
    cors: {
        origin: "http://localhost:3001",
        methods: ["GET", "POST"]
    }
})

io.on("connection", (socket) => {
    webSocketRoutes(io, socket)
})

app.listen(3001, () => {
    console.log("🚀🚀 Listening on port 3001")
})