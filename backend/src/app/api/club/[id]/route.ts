import { parseClubs } from "@/lib/parseClubs"
import { transformToJSONLD } from "@/lib/transformToJSONLD"
import { MongoClient, ObjectId } from "mongodb"
import { NextRequest, NextResponse } from "next/server"

const uri = process.env.MONGODB_URI
const dbName = process.env.MONGODB_DB

export async function GET(request: NextRequest) {
	const { url } = request
	const id = url.split("/").pop()

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
		const objectId = new ObjectId(id)
		const club = await collection.findOne({ _id: objectId })

		if (!club)
			return new NextResponse(
				JSON.stringify({
					status: 404,
					message: "Club not found",
				}),
				{
					status: 404,
					headers: {
						"content-type": "application/json",
					},
				}
			)

		const clubsArray = parseClubs([club])
		const jsonldClubs = transformToJSONLD(clubsArray)

		return new NextResponse(
			JSON.stringify({
				status: 200,
				message: "Club found",
				response: jsonldClubs,
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

export async function DELETE(request: NextRequest) {
	const { url } = request
	const id = url.split("/").pop()

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
		const objectId = new ObjectId(id)
		const result = await collection.deleteOne({ _id: objectId })

		if (result.deletedCount === 1) {
			return new NextResponse(
				JSON.stringify({
					status: 200,
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
					status: 404,
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
				status: 400,
				message: "Club not deleted",
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

export async function PUT(request: NextRequest) {
	const { url } = request
	const id = url.split("/").pop()
	const data = await request.json()

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

	if (!data) {
		return new NextResponse(
			JSON.stringify({
				status: 400,
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
					status: 200,
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
					status: 404,
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
				status: 400,
				message: "Error modifying club",
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
