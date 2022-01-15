import fs from "fs"
import path from "path"

export const fileReader = (req, res, next) => {
	req.select = (fileName) => {
		let files = fs.readFileSync(path.join(process.cwd(), "src", "database", fileName + ".json"), "UTF-8")
		files = files ? JSON.parse(files) : []
		return files 
	}

	req.insert = (fileName, file) => {
		fs.writeFileSync(path.join(process.cwd(), "src", "database", fileName + ".json"), JSON.stringify(file, null, 4))
	}

	return next()

}