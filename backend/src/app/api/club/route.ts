import { Club } from "@/types/Club"
import { MongoClient, ObjectId } from "mongodb"
import { NextRequest, NextResponse } from "next/server"

const uri = process.env.MONGODB_URI
const dbName = process.env.MONGODB_DB

export async function POST(request: NextRequest) {
	const data: Club = await request.json()

	if (
		!data ||
		!data["Naziv kluba"] ||
		!data["Godina osnutka"] ||
		!data.Adresa ||
		!data["Telefon/fax"] ||
		!data["E-mail"] ||
		!data["Web mjesto"] ||
		!data["Ovlaštena osoba1"] ||
		!data.OIB ||
		!data["Registarski broj"] ||
		!data["Datum unosa/izmjene"] ||
		!data["Član RSS"] ||
		!data.Sportovi
	) {
		return new NextResponse(
			JSON.stringify({
				status: 400,
				message: "Not all required fields are provided",
			}),
			{
				status: 400,
				headers: {
					"content-type": "application/json",
				},
			}
		)
	}

	if (!uri) {
		return new NextResponse(
			JSON.stringify({
				status: 400,
				message: "MongoDB URI not provided",
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
				message: "MongoDB DB name not provided",
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
		const result = await collection.insertOne(data as any)

		if (!result.insertedId)
			return new NextResponse(
				JSON.stringify({
					status: 400,
					message: "Club not created",
				}),
				{
					status: 400,
					headers: {
						"content-type": "application/json",
					},
				}
			)

		return new NextResponse(
			JSON.stringify({
				status: 201,
				message: "Club created successfully",
				insertedId: result.insertedId,
			}),
			{
				status: 201,
				headers: {
					"content-type": "application/json",
				},
			}
		)
	} catch (e) {
		return new NextResponse(
			JSON.stringify({
				status: 400,
				message: "Error creating club",
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
