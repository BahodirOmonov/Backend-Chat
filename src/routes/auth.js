import express from "express"
import multer from "multer"
import { LOGIN, REGISTER } from "../controllers/auth.js"

const authRouter = express.Router()
const imageUpload = multer()

authRouter.post("/register", imageUpload.single("image"), REGISTER)
authRouter.post("/login", LOGIN)

export default authRouter