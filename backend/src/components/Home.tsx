"use client"
import { useUser } from "@auth0/nextjs-auth0/client"
import Link from "next/link"
import LoadingPage from "./Loading"
import ErrorPage from "./Error"
import RefreshDumpButton from "./RefreshDumpButton"

export default function HomePage() {
	const { user, error, isLoading } = useUser()

	if (isLoading) return <LoadingPage />
	if (error) return <ErrorPage />

	return (
		<div className="flex flex-row justify-evenly">
			<div className="flex flex-row items-center justify-center p-4 gap-2">
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
					<button className="btn btn-outline-secondary">
						Datatable
					</button>
				</Link>
			</div>

			<div className="flex flex-row items-center justify-center p-4 gap-2">
				{user ? (
					<>
						<a href="/profile">
							<button className="btn btn-outline-primary">
								Korisnički račun
							</button>
						</a>
						<RefreshDumpButton />
						<a href="/api/auth/logout">
							<button className="btn btn-outline-primary">
								Odjava
							</button>
						</a>
					</>
				) : (
					<a href="/api/auth/login">
						<button className="btn btn-outline-primary">
							Prijava
						</button>
					</a>
				)}
			</div>
		</div>
	)
}
