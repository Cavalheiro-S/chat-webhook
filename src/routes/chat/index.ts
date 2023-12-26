import { Router } from "express";
import { ChatRepository } from "../../repository/chat-repository";


export const chatRoutes = Router()
const repository = new ChatRepository();

chatRoutes.post("/message", async (req, res) => {

    const { userOneId, userTwoId, ...message } = req.body
    const chat = await repository.getChatByUserId(userOneId, userTwoId)
    if (!chat) {
        return res.status(404).json({ message: "Chat not found" })
    }
    const messageCreated = await repository.createMessage(userOneId, chat.id, message.text)
    res.json(messageCreated)
})

chatRoutes.get("/messages/:userOneId/:userTwoId", async (req, res) => {
    const { userOneId, userTwoId } = req.params
    const chats = await repository.getChatByUserId(userOneId, userTwoId)
    if (!chats)
        return res.status(404).json({ message: "Chat not found" })
    res.json(chats.messages)
})