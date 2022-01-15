import jwt from "jsonwebtoken"


export const sign = (payload) => {
	try {
		return jwt.sign(payload, process.env.TOKEN_KEY, {expiresIn: 86400})
	} catch {
		return next(error)
	}
}

export const verify = (token) => {
	try {
		return jwt.verify(token, process.env.TOKEN_KEY)
	} catch(error) {
		return next(error)
	}
}
 