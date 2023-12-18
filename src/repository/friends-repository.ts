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
                userTwo: true
            }
        })

        const friendIds = users.map((friend) => friend.userOne.id === id ? friend.userTwo.id : friend.userOne.id)

        const friends = await prisma.user.findMany({
            where: {
                id: {
                    in: friendIds
                }
            }
        })

        return friends
    }

    async addFriend(userId: string, friendId: string) {
        const { createdAt } = await prisma.friend.create({
            data: {
                userOneId: userId,
                userTwoId: friendId,
            }
        })

        return { createdAt }
    }
}