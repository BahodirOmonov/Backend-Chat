import jwt from "jsonwebtoken"


export const sign = (payload) => {
	return jwt.sign(payload, process.env.TOKEN_KEY, {expiresIn: 86400})
}

export const verify = (token) => {
	return jwt.verify(token, process.env.TOKEN_KEY)
}