import { MongoClient } from "mongodb"
import { NextRequest, NextResponse } from "next/server"

const uri =
	"mongodb://bmedvedec:lozinka@mongo:27017/orlabDB?authSource=admin"
const dbName = "orlabDB"

export async function GET(request: NextRequest) {
	const { url } = request
	const sport = url.split("/").pop()?.toUpperCase()

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

	const client = new MongoClient(uri)

	try {
		await client.connect()
		const db = client.db(dbName)
		const collection = db.collection("clubs")
		const clubs = await collection.find({ Sportovi: sport }).toArray()

		if (clubs.length === 0)
			return new NextResponse(
				JSON.stringify({
					message: "No clubs found",
				}),
				{
					status: 404,
					headers: {
						"content-type": "application/json",
					},
				}
			)

		return new NextResponse(JSON.stringify(clubs), {
			status: 200,
			headers: {
				"content-type": "application/json",
			},
		})
	} catch (e) {
		return new NextResponse(
			JSON.stringify({
				message: "Error getting clubs",
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
