"use server"
import { MongoClient } from "mongodb"

export async function getDatabase() {
	const mongodb_uri =
		"mongodb://bmedvedec:lozinka@mongo:27017/orlabDB?authSource=admin"
	const client = await MongoClient.connect(mongodb_uri)

	try {
		await client.connect()
		console.log("Connected correctly to server")
		const db = client.db()
		const collection = db.collection("clubs")
		const data = await collection.find({}).toArray()
		return JSON.stringify(data)
	} catch (error) {
		console.log(error)
		throw error
	}
}
    