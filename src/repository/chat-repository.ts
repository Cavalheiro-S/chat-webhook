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
                        id: true,
                        text: true,
                        userId: true,
                        createdAt: true
                    },
                    orderBy: {
                        createdAt: 'asc'
                    }
                }
            }
        })
        return chat
    }


    async createMessage(userId: string, friendId: string, text: string) {
        const chat = await prisma.chat.findFirst({
            where: {
                friend: {
                    OR: [
                        {
                            userOneId: userId,
                            userTwoId: friendId
                        },
                        {
                            userOneId: friendId,
                            userTwoId: userId
                        }
                    ]
                }
            }
        })
        if (!chat) return;
        const message = await prisma.message.create({
            data: {
                text,
                chatId: chat.id,
                userId
            },
        })
        return message
    }
}