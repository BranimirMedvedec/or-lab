"use server"
import { Club } from "@/types/Club"
import fs from "fs"

export default async function updateDump(clubs: Club[]) {
	try {
		updateJSONfile(clubs)
		updateCSVfile(clubs)
	} catch (err) {
		throw err
	}
}

const updateJSONfile = (data: Club[]) => {
	try {
		fs.writeFileSync("src/data/clubs.json", JSON.stringify(data))
	} catch (err) {
		throw err
	}
}

const updateCSVfile = (data: Club[]) => {
	const header = Object.keys(data[0]).join(";") + "\n"
	const body = data.map((club) => Object.values(club).join(";")).join("\n")

	try {
		fs.writeFileSync("src/data/clubs.csv", header + body)
	} catch (err) {
		throw err
	}
}
