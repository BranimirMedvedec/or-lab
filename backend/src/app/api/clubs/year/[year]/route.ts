import { parseClubs } from "@/lib/parseClubs"
import { transformToJSONLD } from "@/lib/transformToJSONLD"
import { MongoClient } from "mongodb"
import { NextRequest, NextResponse } from "next/server"

const uri = process.env.MONGODB_URI
const dbName = process.env.MONGODB_DB

export async function GET(request: NextRequest) {
	const { url } = request
	const yearString = url.split("/").pop()

	if (!yearString)
		return new NextResponse(
			JSON.stringify({
				status: 400,
				message: "No year provided",
			}),
			{
				status: 400,
				headers: {
					"content-type": "application/json",
				},
			}
		)

	if (yearString.includes("-")) {
		const yearRange = yearString.split("-")
		if (yearRange.length !== 2)
			return new NextResponse(
				JSON.stringify({
					status: 400,
					message: "Invalid year range",
				}),
				{
					status: 400,
					headers: {
						"content-type": "application/json",
					},
				}
			)

		const startYear = Number(yearRange[0])
		const endYear = Number(yearRange[1])
		if (isNaN(startYear) || isNaN(endYear))
			return new NextResponse(
				JSON.stringify({
					status: 400,
					message: "Invalid year range",
				}),
				{
					status: 400,
					headers: {
						"content-type": "application/json",
					},
				}
			)

		return handleYearRange(startYear, endYear)
	} else {
		const year = Number(yearString)
		if (isNaN(year))
			return new NextResponse(
				JSON.stringify({
					status: 400,
					message: "Invalid year",
				}),
				{
					status: 400,
					headers: {
						"content-type": "application/json",
					},
				}
			)
		return handleYear(year)
	}
}

async function handleYearRange(startYear: number, endYear: number) {
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
		const clubs = await collection
			.find({ "Godina osnutka": { $gte: startYear, $lte: endYear } })
			.toArray()

		if (clubs.length === 0)
			return new NextResponse(
				JSON.stringify({
					status: 404,
					message: "No clubs found in the specified year range",
				}),
				{
					status: 404,
					headers: {
						"content-type": "application/json",
					},
				}
			)

		const clubsArray = parseClubs(clubs)
		const jsonldClubs = transformToJSONLD(clubsArray)

		return new NextResponse(
			JSON.stringify({
				status: 200,
				message: "Clubs found",
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
				message: "Error getting clubs",
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

async function handleYear(year: number) {
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

		if (isNaN(year))
			return new NextResponse(
				JSON.stringify({
					status: 400,
					message: "Invalid year",
				}),
				{
					status: 400,
					headers: {
						"content-type": "application/json",
					},
				}
			)

		const clubs = await collection
			.find({ "Godina osnutka": year })
			.toArray()

		if (clubs.length === 0)
			return new NextResponse(
				JSON.stringify({
					status: 404,
					message: "No clubs found",
				}),
				{
					status: 404,
					headers: {
						"content-type": "application/json",
					},
				}
			)

		const clubsArray = parseClubs(clubs)
		const jsonldClubs = transformToJSONLD(clubsArray)

		return new NextResponse(
			JSON.stringify({
				status: 200,
				message: "Clubs found",
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
				message: "Error getting clubs",
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
