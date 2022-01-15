import express from 'express'
import {PORT} from "../config.js"

const app = express()

//middlewares import

import {fileReader} from "./middlewares/model.js"

app.use(fileReader)

// routes import

import userRouter from "./routes/user.js"
import authRouter from "./routes/auth.js"

app.use("/users", userRouter)
app.use("/auth", authRouter)



app.use((error, req, res, next) => {
	res.json({
		message: error.message
	})
})




app.listen(PORT, () => console.log("Server is running on http://localhost:" + PORT))