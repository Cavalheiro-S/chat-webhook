import { prisma } from "../../prisma"


export class ChatRepository {
    async getChatByUserId(userOneId: string, userTwoId: string) {
        const chat = await prisma.chat.findFirst({
            where: {
                friend: {
                    OR: [
                        {
                            userOneId: userOneId,
                            userTwoId: userTwoId
                        },
                        {
                            userOneId: userTwoId,
                            userTwoId: userOneId
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