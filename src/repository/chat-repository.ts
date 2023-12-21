import { prisma } from "../../prisma"


export class ChatRepository {
    async getChatsByUserId(userId: string) {
        const chat = await prisma.chat.findFirst({
            where: {
                friend: {
                    OR: [
                        {
                            userOneId: userId
                        },
                        {
                            userTwoId: userId
                        }
                    ]
                }
            },
            include: {
                messages: {
                    select: {
                        text: true
                    },
                    take: 4
                }
            }
        })
        return chat
    }


    async createMessage(chatId: string, text: string) {

        const message = await prisma.message.create({
            data: {
                text,
                chatId
            }
        })
        return message
    }
}