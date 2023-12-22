import cors from 'cors';
import express from 'express';
import { Server } from 'socket.io';
import { authRoutes } from './routes/auth';
import { friendRoutes } from './routes/friend';
import { ChatRepository } from './repository/chat-repository';
import { chatRoutes } from './routes/chat';

const app = express()
const io = new Server(3002, {
    cors: {
        origin: "http://localhost:3001",
        methods: ["GET", "POST"]
    }
})
app.use(cors())
app.use(express.json())
app.use("/auth", authRoutes)
app.use("/friend", friendRoutes)
app.use("/chat", chatRoutes)
const chatRepository = new ChatRepository();

io.on("connection", (socket) => {

    socket.on("join-room", async userId => {
        const chat = await chatRepository.getChatsByUserId(userId)
        if (!chat) {
            return
        }
        socket.join(chat.id)
        console.log(`User ${userId} joined room ${chat.id}`);
    })

    socket.on("send-message", async ({ userId, message, room }) => {
        if (room) {
            const messageCreated = await chatRepository.createMessage(userId, room, message)
            console.log(`Message sent to room ${room}`);
            io.to(room).emit("receive-message", messageCreated)
        } else {
            socket.broadcast.emit("receive-message", message)
        }
    })
})


app.listen(3001, () => {
    console.log("🚀🚀 Listening on port 3001")
})