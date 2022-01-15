import {verify} from "../utils/jwt.js"

export const checkToken = (req, res, next) => {
	try {
		const {token} = req.headers
		if(!token) {
			throw new Error("Token mavjud emas!")
		}
		
		const {userId, agent} = verify(token)

		const users = req.select('users')

		const found = users.find(user => user.userId == userId)

		if(agent != req.headers["user-agent"] || !found) {
			throw new Error("Qaytadan login qiling!")
		}

		req.userId = userId

		return next()

	} catch(error) {
		return next(error)
	}

}