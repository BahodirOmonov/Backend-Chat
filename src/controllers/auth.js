import fs from "fs"
import path from "path"
import sha256 from "sha256"

export const REGISTER = (req, res, next) => {
	try {
		if (!req.file) {
			throw new Error ("Rasm kiritilmadi!")
		} 

		const {originalname, mimetype, buffer, size} = req.file

		if (size > (5 * 1024 * 1024)) {
			throw new Error ("Rasm hajmi 5 MB dan kichik bo'lishi kerak!")
		}

		if(!["image/jpg", "image/png", "image/jpeg"].includes(mimetype)) {
			throw new Error ("Rasm faqat png yoki jpeg bo'lishi kerak!")
		}

		let {username, password} = req.body

		username = username.trim()
		password = password.trim()

		if(!username || !password) {
			throw new Error ("username yoki password kiritilmagan!")
		}

		if(username.length < 1 || username.length > 50) {
			throw new Error("username uzunligi 1 va 50 orasida bo'lishi kerak!")
		}

		if(password < 5 || password > 15) {
			throw new Error ("password uzunligi 5 va 15 orasida bo'lishi kerak!")
		}

		const users = req.select("users")

		const found = users.find(user => user.username == username)

		if(found) {
			throw new Error ("Bu username band!")
		}
		
		const imageName = Date.now() + originalname.replace(/\s/g, "")

		fs.writeFileSync(path.join(process.cwd(), "files", "images", imageName), buffer)

		const newUser = {
			userId: users.length ? users[users.length - 1].userId + 1: 1,
			username,
			password: sha256(password),
			userImage: "/images/" + imageName,
			userDate: new Date()
		}

		users.push(newUser)

		req.insert("users", users)

		delete newUser.password
		return res.status(201).json({
			message: "User muvaffaqiyatli ro'yxatdan o'tdi!",
			user: newUser
		})

	}catch(error) {
		return next(error)
	}
}

export const LOGIN = (req, res, next) => {
	try {
		//...
	} catch(error) {
		return next(error)
	}
}