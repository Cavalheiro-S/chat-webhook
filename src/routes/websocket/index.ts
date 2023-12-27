import { Server, Socket } from 'socket.io';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import { ChatRepository } from '../../repository/chat-repository';

const chatRepository = new ChatRepository();

export const webSocketRoutes = (io: Server, socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>) => {

    socket.on("join-room", async ({ userOneId, userTwoId }) => {
        const chat = await chatRepository.getChatByUserId(userOneId, userTwoId)
        if (!chat) {
            return
        }
        console.log(chat);
        socket.join(chat.id)
        socket.emit("previous-messages", chat.messages)
    })

    socket.on("leave-room", async chatId => {
        socket.leave(chatId)
    })

    socket.on("send-message", async ({ userOneId, friendId, message }) => {
        const chat = await chatRepository.getChatByUserId(userOneId, friendId)
        if (!chat) return
        const messageCreated = await chatRepository.createMessage(userOneId, friendId, message)
        io.to(chat.id).emit("receive-message", messageCreated)
        if (chat.id) {

        } else {
            socket.broadcast.emit("receive-message", message)
        }
    })

}