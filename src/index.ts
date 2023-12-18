import cors from 'cors';
import express from 'express';
import { Server } from 'socket.io';
import { authRoutes } from './routes/auth';
import { friendRoutes } from './routes/friend';

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

io.on("connection", (socket) => {
    socket.on("chat message", (msg) => {
        console.log("message:")
        console.log(msg);
        
    })
})


app.listen(3001, () => {
    console.log("🚀🚀 Listening on port 3001")
})