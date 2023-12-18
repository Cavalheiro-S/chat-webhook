import { Router } from "express";
import { FriendsRepository } from "../../repository/friends-repository";

export const friendRoutes = Router()
const friendsRepository = new FriendsRepository();

friendRoutes.get("/all/:id", async (req, res) => {
    const { id } = req.params
    const friends = await friendsRepository.getFriendsById(id)
    res.json(friends)
})

friendRoutes.post("/add", async (req, res) => {
    const { userOneId, userTwoId } = req.body
    const { createdAt } = await friendsRepository.addFriend(userOneId, userTwoId)
    res.json({ createdAt })
})