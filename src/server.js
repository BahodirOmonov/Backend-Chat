import express from 'express'
import {PORT} from "../config.js"
import cors from "cors"

const app = express()

//middlewares import

import {fileReader} from "./middlewares/model.js"

app.use(cors())
app.use(express.json())
app.use(fileReader)

// routes import

import userRouter from "./routes/user.js"
import authRouter from "./routes/auth.js"
import messageRouter from "./routes/message.js"

app.use("/users", userRouter)
app.use("/auth", authRouter)
app.use("/messages", messageRouter)


app.use((error, req, res, next) => {
	console.log(req.method, req.url)
	res.json({
		message: error.message
	})
})

app.listen(PORT, () => console.log("Server is running on http://localhost:" + PORT))