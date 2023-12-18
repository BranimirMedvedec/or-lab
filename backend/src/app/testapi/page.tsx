"use client"
import { Club } from "@/types/Club"
import { useState } from "react"
import ErrorPage from "@/components/Error"

export default function TestApi() {
	const [apiResponse, setApiResponse] = useState(null)
	const [error, setError] = useState(false)

	const handleGetClubsClick = async () => {
		try {
			const response = await fetch("http://localhost:3000/api/getClubs")
			const data = await response.json()
			setApiResponse(data)
		} catch (error) {
			setError(true)
		}
	}

	const handleGetClubClick = async () => {
		try {
			const clubId = "657ddf89f48113dc55508980"
			const response = await fetch(
				`http://localhost:3000/api/getClub/${clubId}`
			)
			const data = await response.json()
			setApiResponse(data)
		} catch (error) {
			setError(true)
		}
	}

	const handleGetRandomClubClick = async () => {
		try {
			const response = await fetch(
				`http://localhost:3000/api/getRandomClub`
			)
			const data = await response.json()
			setApiResponse(data)
		} catch (error) {
			setError(true)
		}
	}

	const handleGetClubsBySportClick = async () => {
		try {
			const sport = "TENIS"
			const response = await fetch(
				`http://localhost:3000/api/getClubsBySport/${sport}`
			)
			const data = await response.json()
			setApiResponse(data)
		} catch (error) {
			setError(true)
		}
	}

	const handleGetClubsByYearClick = async () => {
		try {
			const year = "2000"
			const response = await fetch(
				`http://localhost:3000/api/getClubsByYear/${year}`
			)
			const data = await response.json()
			setApiResponse(data)
		} catch (error) {
			setError(true)
		}
	}

	const handleGetClubsByYearRangeClick = async () => {
		try {
			const startYear = "2000"
			const endYear = "2004"
			const response = await fetch(
				`http://localhost:3000/api/getClubsByYearRange/${startYear}-${endYear}`
			)
			const data = await response.json()
			setApiResponse(data)
		} catch (error) {
			setError(true)
		}
	}

	const handleCreateClubClick = async () => {
		try {
			const clubData: Club = {
				"Naziv kluba": "Klub XYZ",
				"Godina osnutka": 2022,
				Adresa: "Some Address",
				"Telefon/fax": "123456789",
				"E-mail": "club@example.com",
				"Web mjesto": "www.example.com",
				"Ovlaštena osoba1": "John Doe (president)",
				OIB: "12345678901",
				"Registarski broj": 123456,
				"Datum unosa/izmjene": new Date().toISOString(),
				"Član RSS": "false",
				Sportovi: ["KENDO", "IAIDO"],
			}
			const response = await fetch(
				`http://localhost:3000/api/createClub`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(clubData),
				}
			)

			const data = await response.json()
			setApiResponse(data)
		} catch (error) {
			setError(true)
		}
	}

	const handleDeleteClubClick = async () => {
		try {
			const clubId = "657ddf89f48113dc55508980"
			const response = await fetch(
				`http://localhost:3000/api/deleteClub/${clubId}`,
				{
					method: "DELETE",
					headers: {
						"Content-Type": "application/json",
					},
				}
			)

			const data = await response.json()
			setApiResponse(data)
		} catch (error) {
			setError(true)
		}
	}

	const handleModifyClubClick = async () => {
		try {
			const clubId = "657ddf89f48113dc55508980"
			const clubData = {
				"Naziv kluba": "Klub ghjk",
			}
			const response = await fetch(
				`http://localhost:3000/api/modifyClub/${clubId}`,
				{
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(clubData),
				}
			)

			const data = await response.json()
			setApiResponse(data)
		} catch (error) {
			setError(true)
		}
	}

	const handleGetJsonApiSpecClick = async () => {
		try {
			const response = await fetch(`http://localhost:3000/api/getApiSpec`)
			const data = await response.json()
			setApiResponse(data)
		} catch (error) {
			setError(true)
		}
	}

	const handleCopyToClipboard = () => {
		navigator.clipboard.writeText(JSON.stringify(apiResponse, null, 2))
	}

	return error ? (
		<ErrorPage />
	) : (
		<div className="flex flex-col items-center justify-center min-h-screen py-2">
			<div className=" p-6 rounded-lg shadow-lg w-full max-w-md mx-auto">
				<h1 className="text-4xl font-bold mb-4 text-center">TestApi</h1>
				<div className="space-y-4">
					<button
						onClick={handleGetClubsClick}
						className="w-full px-4 py-2 font-semibold text-white bg-blue-500 rounded hover:bg-blue-700">
						Test getClubs API
					</button>
					<button
						onClick={handleGetClubClick}
						className="w-full px-4 py-2 font-semibold text-white bg-blue-500 rounded hover:bg-blue-700">
						Test getClub API
					</button>
					<button
						onClick={handleGetRandomClubClick}
						className="w-full px-4 py-2 font-semibold text-white bg-blue-500 rounded hover:bg-blue-700">
						Test getRandomClub API
					</button>
					<button
						onClick={handleGetClubsBySportClick}
						className="w-full px-4 py-2 font-semibold text-white bg-blue-500 rounded hover:bg-blue-700">
						Test getClubsBySport API
					</button>
					<button
						onClick={handleGetClubsByYearClick}
						className="w-full px-4 py-2 font-semibold text-white bg-blue-500 rounded hover:bg-blue-700">
						Test getClubByYear API
					</button>
					<button
						onClick={handleGetClubsByYearRangeClick}
						className="w-full px-4 py-2 font-semibold text-white bg-blue-500 rounded hover:bg-blue-700">
						Test getClubsByYearRange API
					</button>
					<button
						onClick={handleCreateClubClick}
						className="w-full px-4 py-2 font-semibold text-white bg-blue-500 rounded hover:bg-blue-700">
						Test createClub API
					</button>
					<button
						onClick={handleDeleteClubClick}
						className="w-full px-4 py-2 font-semibold text-white bg-blue-500 rounded hover:bg-blue-700">
						Test deleteClub API
					</button>
					<button
						onClick={handleModifyClubClick}
						className="w-full px-4 py-2 font-semibold text-white bg-blue-500 rounded hover:bg-blue-700">
						Test modifyClub API
					</button>
					<button
						onClick={handleGetJsonApiSpecClick}
						className="w-full px-4 py-2 font-semibold text-white bg-blue-500 rounded hover:bg-blue-700">
						Test getJsonApiSpec API
					</button>
				</div>
			</div>

			{apiResponse && (
				<div className="mt-8 text-left w-full max-w-4xl">
					<div className="flex justify-between items-center mb-4">
						<h2 className="text-2xl font-bold mb-2">
							API Response:
						</h2>
						<button
							onClick={handleCopyToClipboard}
							className="px-4 py-2 font-semibold text-white bg-blue-500 rounded hover:bg-blue-700">
							Copy to clipboard
						</button>
					</div>
					<pre className="p-4 bg-gray-600 rounded shadow">
						{JSON.stringify(apiResponse, null, 2)}
					</pre>
				</div>
			)}
		</div>
	)
}
