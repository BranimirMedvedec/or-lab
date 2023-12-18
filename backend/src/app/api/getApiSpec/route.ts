import { MongoClient, ObjectId } from "mongodb"
import { NextRequest } from "next/server"

const uri =
	"mongodb://bmedvedec:lozinka@mongo:27017/orlabDB?authSource=admin"
const dbName = "orlabDB"

export async function GET(request: NextRequest) {
	if (!uri) {
		return new Response(
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
		return new Response(
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
		const collection = db.collection("api")
		const openApiSpec = await collection
			.find({})
			.project({ _id: 0 })
			.toArray()

		if (openApiSpec.length === 0)
			return new Response(
				JSON.stringify({
					message: "OpenAPI spec not found",
				}),
				{
					status: 404,
					headers: {
						"content-type": "application/json",
					},
				}
			)

		return new Response(JSON.stringify(openApiSpec[0]), {
			status: 200,
			headers: {
				"content-type": "application/json",
			},
		})
	} catch (e) {
		return new Response(
			JSON.stringify({
				message: "Error getting OpenAPI spec",
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
