import { parseClubs } from "@/lib/parseClubs"
import { transformToJSONLD } from "@/lib/transformToJSONLD"
import { MongoClient } from "mongodb"
import { NextRequest, NextResponse } from "next/server"

const uri = process.env.MONGODB_URI
const dbName = process.env.MONGODB_DB

export async function GET(request: NextRequest) {
	if (!uri) {
		return new NextResponse(
			JSON.stringify({
				status: 400,
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
				status: 400,
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
		const club = await collection
			.aggregate([{ $sample: { size: 1 } }])
			.toArray()

		if (club.length === 0)
			return new NextResponse(
				JSON.stringify({
					status: 404,
					message: "No club found",
				}),
				{
					status: 404,
					headers: {
						"content-type": "application/json",
					},
				}
			)

		const clubsArray = parseClubs(club)
		const jsonldClubs = transformToJSONLD(clubsArray)

		return new NextResponse(
			JSON.stringify({
				status: 200,
				message: "Club found",
				response: jsonldClubs[0],
			}),
			{
				status: 200,
				headers: {
					"content-type": "application/ld+json",
				},
			}
		)
	} catch (e) {
		return new NextResponse(
			JSON.stringify({
                status: 400,
				message: "Error getting club",
			}),
			{
				status: 400,
				headers: {
					"content-type": "application/json",
				},
			}
		)
	} finally {
		await client.close()
	}
}
