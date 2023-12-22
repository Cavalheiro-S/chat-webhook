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
                        text: true,
                        userId: true,
                        createdAt: true
                    },
                    take: 4,
                    orderBy: {
                        createdAt: 'desc'
                    }
                }
            }
        })
        return chat
    }


    async createMessage(userId: string, chatId: string, text: string) {

        const message = await prisma.message.create({
            data: {
                text,
                chatId,
                userId
            },
        })
        return message
    }
}