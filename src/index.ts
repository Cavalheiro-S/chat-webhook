import cors from 'cors';
import express from 'express';
import { Server } from 'socket.io';
import { prisma } from '../prisma';
import { authRoutes } from './routes/auth';

const app = express()
const io = new Server(3002, {
    cors: {
        origin: "http://localhost:3001",
        methods: ["GET", "POST"]
    }
})
app.use(express.json())
app.use(cors())
app.use("/auth", authRoutes)

io.on("connection", (socket) => {
    console.log("a user connected")
    socket.on("chat message", (msg) => {
        console.log("message: " + msg)
    })
})


app.listen(3001, () => {
    console.log("🚀🚀 Listening on port 3001")
})