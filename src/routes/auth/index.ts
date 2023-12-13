import { Router } from "express";
import { prisma } from "../../../prisma";

export const authRoutes = Router()

authRoutes.post("/register", async (req, res) => {
    const user = req.body
    const userCreated = await prisma.user.create({
        data: {
            name: user.name,
            email: user.email,
            password: user.password
        }
    })
    res.json(userCreated)
})

authRoutes.post("/login", async (req, res) => {
    const user = req.body
    const userCreated = await prisma.user.findFirst({
        where: {
            email: user.email,
            password: user.password
        }
    })
    res.json(userCreated)
})
