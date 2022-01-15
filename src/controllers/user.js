export const GET = (req, res, next) => {
	try {
		const { userId } = req.params
		const users = req.select("users")

		if(userId) {
			return res.json(
				users.find(user => user.userId == userId)
			)
		}

		return res.json(users)

	} catch(error) {
		return next(error)
	}
}


export const PUT = (req, res, next) => {
	try {

	}catch(error) {
		return next(error)
	}
}

export const DELETE = (req, res, next) => {
	try {

	}catch(error) {
		return next(error)
	}
}