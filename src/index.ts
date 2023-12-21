import cors from 'cors';
import express from 'express';
import { Server } from 'socket.io';
import { authRoutes } from './routes/auth';
import { friendRoutes } from './routes/friend';
import { ChatRepository } from './repository/chat-repository';

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

const chatRepository = new ChatRepository();

io.on("connection", (socket) => {
    socket.on("join", async (userId: string) => {
        const chat = await chatRepository.getChatsByUserId(userId)
        socket.join("chat-" + chat?.id)
        io.to("chat-" + chat?.id).emit("chat-" + chat?.id, { message: "user joined" })
    })
    // socket.on("chat message", async ({ message, userId }) => {
    //     console.log(message, userId);
    //     const chat = await chatRepository.getChatsByUserId(userId)
    //     if (!chat) {
    //         return socket.emit("error", { message: "Chat not found" })
    //     }
    //     const messageCreated = await chatRepository.createMessage(chat.id, message)
    //     io.emit("chat message", messageCreated)
    // })
})


app.listen(3001, () => {
    console.log("🚀🚀 Listening on port 3001")
})