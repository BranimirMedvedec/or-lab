import { Club } from "@/types/Club"
import saveAs from "file-saver"
import Papa from "papaparse"

export default function RefreshDumpButton() {
	const handleClick = async () => {
		try {
			const response = await fetch(
				"http://localhost:3000/api/clubs?dump=true"
			)
			const clubs = await response.json()

			if (!clubs) return null

			downloadToJSON(clubs.clubs)
			downloadToCSV(clubs.clubs)
		} catch (error) {
			throw error
		}
	}

	const downloadToJSON = (data: Club[]) => {
		const jsonData = JSON.stringify(data, null, 2)
		const blob = new Blob([jsonData], {
			type: "text/json;charset=utf-8",
		})
		saveAs(blob, "clubs_updated.json")
	}

	const downloadToCSV = (data: Club[]) => {
		const csvData = Papa.unparse(data)
		const blob = new Blob([csvData], { type: "text/csv;charset=utf-8" })
		saveAs(blob, "clubs_updated.csv")
	}

	return (
		<button
			onClick={handleClick}
			className="btn btn-outline-primary">
			Osvježi preslike
		</button>
	)
}
