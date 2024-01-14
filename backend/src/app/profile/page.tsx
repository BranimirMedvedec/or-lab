"use client"
import ErrorPage from "@/components/Error"
import LoadingPage from "@/components/Loading"
import { useUser } from "@auth0/nextjs-auth0/client"
import Link from "next/link"

export default function ProfilePage() {
	const { user, error, isLoading } = useUser()

	if (isLoading) return <LoadingPage />
	if (error) return <ErrorPage />

	return (
		(user && (
			<div className="flex items-center justify-center min-h-screen py-2">
				<div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md mx-auto space-y-1">
					<h1 className="text-3xl font-bold mb-4 text-center">
						Korisnički račun
					</h1>
					<h2 className="text-2xl font-semibold mb-2">
						Name: {user.name}
					</h2>
					<p className="text-lg">Email: {user.email}</p>
					<p className="text-lg">Nickname: {user.nickname}</p>
					<p className="text-lg">
						Email verified: {user.email_verified ? "Yes" : "No"}
					</p>
					<p className="text-lg">Updated at: {user.updated_at}</p>

					<div className="flex flex-row gap-2 justify-center">
						<Link href="/">
							<button className="btn btn-primary">Home</button>
						</Link>
						<a href="/api/auth/logout">
							<button className="btn btn-primary">Odjava</button>
						</a>
					</div>
				</div>
			</div>
		)) || (
			<div className="flex items-center justify-center min-h-screen py-2">
				<div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md mx-auto space-y-1">
					<h1 className="text-3xl font-bold mb-4 text-center">
						Profile page
					</h1>
					<div className="flex flex-row justify-around">
						<p className="text-lg">Not logged in</p>
						<div className="flex flex-row gap-2 justify-center">
							<Link href="/">
								<button className="btn btn-primary">
									Home
								</button>
							</Link>
							<a href="/api/auth/login">
								<button className="btn btn-primary">
									Prijava
								</button>
							</a>
						</div>
					</div>
				</div>
			</div>
		)
	)
}
