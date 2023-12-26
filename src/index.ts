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

    socket.on("join-room", async ({ userOneId, userTwoId }) => {
        const chat = await chatRepository.getChatByUserId(userOneId, userTwoId)
        if (!chat) {
            return
        }
        socket.join(chat.id)
        socket.emit("previous-messages", chat.messages)
        console.log(`User ${userOneId} joined room ${chat.id}`);
    })

    socket.on("leave-room", async chatId => {
        socket.leave(chatId)
    })

    socket.on("send-message", async ({ userOneId, friendId, message }) => {
        const chat = await chatRepository.getChatByUserId(userOneId, friendId)
        if (!chat)
            return
        const messageCreated = await chatRepository.createMessage(userOneId, chat.id, message)
        console.log(`Message sent to room ${chat.id}`);
        io.to(chat.id).emit("receive-message", messageCreated)
        if (chat.id) {

        } else {
            socket.broadcast.emit("receive-message", message)
        }
    })
})


app.listen(3001, () => {
    console.log("🚀🚀 Listening on port 3001")
})