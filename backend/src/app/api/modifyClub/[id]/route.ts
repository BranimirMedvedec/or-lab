import { MongoClient, ObjectId } from "mongodb"
import { NextRequest, NextResponse } from "next/server"

const uri =
	"mongodb://bmedvedec:lozinka@mongo:27017/orlabDB?authSource=admin"
const dbName = "orlabDB"

export async function PUT(request: NextRequest) {
	const { url } = request
	const id = url.split("/").pop()
	const data = await request.json()

	if (!uri) {
		return new NextResponse(
			JSON.stringify({
				message: "MongoDB URI is not set",
			}),
			{
				status: 400,
				headers: {
					"content-type": "application/json",
				},
			}
		)
	}

	if (!dbName) {
		return new NextResponse(
			JSON.stringify({
				message: "MongoDB DB name is not set",
			}),
			{
				status: 400,
				headers: {
					"content-type": "application/json",
				},
			}
		)
	}

	if (!data) {
		return new NextResponse(
			JSON.stringify({
				message: "No data provided",
			}),
			{
				status: 400,
				headers: {
					"content-type": "application/json",
				},
			}
		)
	}

	const client = new MongoClient(uri)

	try {
		await client.connect()
		const db = client.db(dbName)
		const collection = db.collection("clubs")
		const objectId = new ObjectId(id)
		const result = await collection.updateOne(
			{ _id: objectId },
			{ $set: data }
		)
		if (result.modifiedCount === 1) {
			return new NextResponse(
				JSON.stringify({
					message: "Club modified successfully",
				}),
				{
					status: 200,
					headers: {
						"content-type": "application/json",
					},
				}
			)
		} else {
			return new NextResponse(
				JSON.stringify({
					message: "Club not modified or not found",
				}),
				{
					status: 404,
					headers: {
						"content-type": "application/json",
					},
				}
			)
		}
	} catch (e) {
		return new NextResponse(
			JSON.stringify({
				message: "Error modifying club",
			}),
			{
				status: 500,
				headers: {
					"content-type": "application/json",
				},
			}
		)
	} finally {
		await client.close()
	}
}
