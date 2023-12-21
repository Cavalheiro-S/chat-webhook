import { Router } from "express";
import { ChatRepository } from "../../repository/chat-repository";


export const chatRoutes = Router()
const repository = new ChatRepository();

chatRoutes.post("/message", async (req, res) => {

    const { userId, ...message } = req.body
    const chat = await repository.getChatsByUserId(userId)
    if(!chat) {
        return res.status(404).json({ message: "Chat not found" })
    }
    const messageCreated = await repository.createMessage(chat.id, message.text)
    res.json(messageCreated)
})