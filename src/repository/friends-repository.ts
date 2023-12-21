import { prisma } from "../../prisma"

export class FriendsRepository {

    async getFriendsById(id: string) {
        const users = await prisma.friend.findMany({
            where: {
                OR: [
                    {
                        userOneId: id
                    },
                    {
                        userTwoId: id
                    }
                ]
            },

            select: {
                userOne: true,
                userTwo: true,
                Chat: true
            }
        })

        const friendIds = users.map((friend) => friend.userOne.id === id ? friend.userTwo.id : friend.userOne.id)

        const friends = await prisma.user.findMany({
            where: {
                id: {
                    in: friendIds
                }
            },
        })

        return friends.map(friend => {
            return {
                ...friend,
                chatId: users.find((user) => user.userOne.id === friend.id || user.userTwo.id === friend.id)?.Chat?.id
            }
        })
    }

    async addFriend(userOneId: string, userTwoId: string) {
        const { createdAt, id } = await prisma.friend.create({
            data: {
                userOneId: userOneId,
                userTwoId: userTwoId,
            }
        })

        await prisma.chat.create({
            data: {
                name: `Chat with ${userTwoId}`,
                friendId: id
            }
        })
        return { createdAt, friendId: id }
    }
}