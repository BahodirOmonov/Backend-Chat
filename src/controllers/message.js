export const GET = (req, res, next) => {
	try {
		const { messageId } = req.params
		const { userId, sendUserId, messageType } = req.query

		let messages = req.select("messages")

		if(messageId) {
			return res.json(
				messages.find(message => message.messageId == messageId)
			)
		}	

		messages = messages.filter(message => {
			let userFilter = userId ? message.userId == userId: true
			let sendUserFilter = sendUserId ? message.sendUserId == sendUserId: true
			let messageTypeFilter = messageType ? message.messageType == messageType: true
			return userFilter && sendUserFilter && messageTypeFilter
		})

		return res.json(messages)

	} catch (error) {
		return next(error)
	}
}

export const POST = (req, res, next) => {
	try {
		const {messageText, sendUserId} = req.body

		const messages = req.select("messages")

		if(!req.file) {
			if( !messageText || !sendUserId) {
				throw new Error("Xabar kelmadi!")
			}

			const newMessage = {
				messageId: messages.length ? messages[messages.length - 1].messageId + 1: 1,
				userId: req.userId,
				messageDate: new Date(),
				messageType: "tekst",
				messageText,
				sendUserId
			}

			messages.push(newMessage)

			req.insert("messages", messages)

			res.status(200).json({
				message: "Xabar muvaffaqiyatli qo'shildi!",
				data: newMessage
			})
		}

	} catch (error) {
		return next(error)
	}
}