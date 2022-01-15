import express from "express"
import multer from "multer"
import { GET, POST } from "../controllers/message.js"
import {checkToken} from "../middlewares/checkToken.js"

const messageRouter = express.Router()
const messageUpload = multer()

messageRouter.get("/", checkToken, GET)
messageRouter.get("/:messageId", checkToken, GET)
messageRouter.post("/", messageUpload.single("message"), checkToken, POST)

export default messageRouter