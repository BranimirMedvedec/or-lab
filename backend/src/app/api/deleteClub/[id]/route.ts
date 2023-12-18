import { MongoClient, ObjectId } from "mongodb"
import { NextResponse, NextRequest } from "next/server"

const uri =
	"mongodb://bmedvedec:lozinka@mongo:27017/orlabDB?authSource=admin"
const dbName = "orlabDB"

export async function DELETE(request: NextRequest) {
	const { url } = request
	const id = url.split("/").pop()

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
		const objectId = new ObjectId(id)
		const result = await collection.deleteOne({ _id: objectId })

		if (result.deletedCount === 1) {
			return new NextResponse(
				JSON.stringify({
					message: "Club deleted successfully",
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
					message: "Club not found",
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
				message: "Club not deleted",
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
