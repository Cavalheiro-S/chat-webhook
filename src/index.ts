import cors from 'cors';
import express from 'express';
import { Server } from 'socket.io';

const app = express()
const io = new Server(3002, {
    cors: {
        origin: "http://localhost:3001",
        methods: ["GET", "POST"]
    }
})
app.use(cors())

app.get("/", (req, res) => {
    res.send("Hello")
})

io.on("connection", (socket) => {
    console.log("a user connected")
    socket.on("chat message", (msg) => {
        console.log("message: " + msg)
    })
})


app.listen(3001, () => {
    console.log("🚀🚀 Listening on port 3001")
})