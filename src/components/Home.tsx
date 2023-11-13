import Link from "next/link"

export default function HomePage() {
	return (
		<div
			style={{
				display: "flex",
				flexDirection: "row",
				alignItems: "center",
				justifyContent: "center",
				paddingTop: "1.2rem",
				gap: "0.8rem",
			}}>
			<a
				href="/clubs.csv"
				download="clubs">
				<button className="btn btn-outline-secondary">CSV</button>
			</a>
			<a
				href="/clubs.json"
				download="clubs">
				<button className="btn btn-outline-secondary">JSON</button>
			</a>

			<Link href="/datatable">
				<button className="btn btn-outline-secondary">Datatable</button>
			</Link>
		</div>
	)
}
