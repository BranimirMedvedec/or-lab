"use client"
import { useEffect, useState } from "react"
import { getDatabase } from "@/lib/db"
import { Database } from "@/types/Database"
import { Club } from "@/types/Club"
import ErrorPage from "@/components/Error"
import LoadingPage from "@/components/Loading"
import Papa from "papaparse"
import { saveAs } from "file-saver"
import Link from "next/link"

export default function Datatable() {
	const [database, setDatabase] = useState<Database | null>(null)
	const [filteredDatabase, setFilteredDatabase] = useState<Database | null>(
		null
	)
	const [search, setSearch] = useState("")
	const [filter, setFilter] = useState("wildcard")
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(false)

	const filterData = (database: Database, filter: string, search: string) => {
		if (!database) return null

		return database.filter((club) =>
			filter === "wildcard"
				? Object.values(club).some(
						(value) =>
							value !== null &&
							value
								.toString()
								.toLowerCase()
								.includes(search.toLowerCase())
				  )
				: String(club[filter as keyof Club])
						.toLowerCase()
						.includes(search.toLowerCase())
		)
	}

	useEffect(() => {
		async function fetchData() {
			try {
				await getDatabase().then((data) => {
					const temp: Database = JSON.parse(data)
					setDatabase(temp)
				})
			} catch (error) {
				setError(true)
			}
		}
		fetchData()
	}, [])

	useEffect(() => {
		setFilteredDatabase(database)
		setLoading(false)
	}, [database])

	const handleFiltering = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setLoading(true)
		if (database) {
			const newData: Database | null = filterData(
				database,
				filter,
				search
			)
			setFilteredDatabase(newData)
			if (newData) {
				setLoading(false)
				setError(false)
			} else {
				setLoading(false)
				setError(true)
			}
		}
	}

	// useEffect(() => {
	// 	setLoading(true)
	// 	if (database) {
	// 		const newData: Database | null = filterData(
	// 			database,
	// 			filter,
	// 			search
	// 		)
	// 		setFilteredDatabase(newData)
	// 		if (newData) {
	// 			setLoading(false)
	// 			setError(false)
	// 		} else {
	// 			setLoading(false)
	// 			setError(true)
	// 		}
	// 	}
	// }, [search, filter, database])

	const downloadToCSV = () => {
		if (filteredDatabase) {
			const csvData = Papa.unparse(filteredDatabase)
			const blob = new Blob([csvData], { type: "text/csv;charset=utf-8" })
			saveAs(blob, "filtered.csv")
		}
	}

	const downloadToJSON = () => {
		if (filteredDatabase) {
			const jsonData = JSON.stringify(filteredDatabase)
			const blob = new Blob([jsonData], {
				type: "text/json;charset=utf-8",
			})
			saveAs(blob, "filtered.json")
		}
	}

	if (loading) return <LoadingPage />
	if (error) return <ErrorPage />

	return (
		<div>
			<div className="flex flex-col justify-start px-4 sm:flex-row sm:items-center sm:justify-center sm:w-full sm:overflow-x-auto items-center gap-3 py-2">
				<form onSubmit={handleFiltering}>
					<input
						id="pretraga"
						className="input input-secondary"
						placeholder="Search..."
						value={search}
						onChange={(e) => {
							setSearch(e.target.value)
						}}
					/>
					<select
						id="atribut"
						className="select select-secondary"
						onChange={(e) => {
							setFilter(e.target.value)
						}}>
						<option>wildcard</option>
						<option>Naziv kluba</option>
						<option>Godina osnutka</option>
						<option>Adresa</option>
						<option>Telefon/fax</option>
						<option>E-mail</option>
						<option>Web mjesto</option>
						<option>Ovlaštena osoba1</option>
						<option>OIB</option>
						<option>Registarski broj</option>
						<option>Datum unosa/izmjene</option>
						<option>Član RSS</option>
						<option>Sportovi</option>
					</select>
					<button
						id="gumb"
						className="btn btn-primary"
						type="submit">
						Filter
					</button>
				</form>

				<div className="flex flex-row w-full justify-center items-center gap-4">
					<Link href="/">
						<button className="btn btn-primary">Home</button>
					</Link>
					<button
						className="btn btn-outline-primary"
						onClick={downloadToCSV}>
						Download CSV
					</button>
					<button
						className="btn btn-outline-primary"
						onClick={downloadToJSON}>
						Download JSON
					</button>
				</div>
			</div>

			<div className="flex w-full overflow-x-auto">
				<table
					id="tablica"
					className="table-hover table">
					<thead>
						<tr>
							<th>Naziv kluba</th>
							<th>Godina osnutka</th>
							<th>Adresa</th>
							<th>Telefon/fax</th>
							<th>E-mail</th>
							<th>Web mjesto</th>
							<th>Ovlaštena osoba1</th>
							<th>OIB</th>
							<th>Registarski broj</th>
							<th>Datum unosa/izmjene</th>
							<th>Član RSS</th>
							<th>Sportovi</th>
						</tr>
					</thead>
					<tbody>
						{filteredDatabase &&
							filteredDatabase.map((club) => (
								<tr key={club._id}>
									<td style={{ whiteSpace: "normal" }}>
										{club["Naziv kluba"]}
									</td>
									<td style={{ whiteSpace: "normal" }}>
										{club["Godina osnutka"]}
									</td>
									<td style={{ whiteSpace: "normal" }}>
										{club.Adresa}
									</td>
									<td style={{ whiteSpace: "normal" }}>
										{club["Telefon/fax"]}
									</td>
									<td style={{ whiteSpace: "normal" }}>
										{club["E-mail"]}
									</td>
									<td style={{ whiteSpace: "normal" }}>
										{club["Web mjesto"]}
									</td>
									<td style={{ whiteSpace: "normal" }}>
										{club["Ovlaštena osoba1"]}
									</td>
									<td>{club.OIB}</td>
									<td style={{ whiteSpace: "normal" }}>
										{club["Registarski broj"]}
									</td>
									<td style={{ whiteSpace: "normal" }}>
										{club["Datum unosa/izmjene"]}
									</td>
									<td style={{ whiteSpace: "normal" }}>
										{club["Član RSS"]}
									</td>
									<td style={{ whiteSpace: "normal" }}>
										{club.Sportovi?.map((sport) => (
											<p key={club._id + sport}>
												{sport}
											</p>
										))}
									</td>
								</tr>
							))}
					</tbody>
				</table>
			</div>
		</div>
	)
}
