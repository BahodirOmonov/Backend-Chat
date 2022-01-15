import express from "express"
import { GET, PUT, DELETE } from "../controllers/user.js"

const userRouter = express.Router()

userRouter.get("/", GET)
userRouter.get("/:userId", GET)
userRouter.put("/", PUT)

export default userRouter