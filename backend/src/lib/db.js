"use server"
import { MongoClient } from "mongodb"

const uri = process.env.MONGODB_URI

export async function getDatabase() {
	const client = await MongoClient.connect(uri)

	try {
		await client.connect()
		console.log("Connected correctly to server")
		const db = client.db()
		const collection = db.collection("clubs")
		const data = await collection.find({}).toArray()
		return JSON.stringify(data)
	} catch (error) {
		throw error
	}
}
