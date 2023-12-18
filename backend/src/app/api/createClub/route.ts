import { Club } from "@/types/Club"
import { MongoClient } from "mongodb"
import { NextRequest, NextResponse } from "next/server"

const uri =
	"mongodb://bmedvedec:lozinka@mongo:27017/orlabDB?authSource=admin"
const dbName = "orlabDB"

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
					message: "Club not created",
				}),
				{
					status: 500,
					headers: {
						"content-type": "application/json",
					},
				}
			)

		return new NextResponse(
			JSON.stringify({
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
				message: "Error creating club",
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
