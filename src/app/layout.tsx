import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Author } from "next/dist/lib/metadata/types/metadata-types"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
	title: "Sportski klubovi na području Rijeke",
	description: "Sportski klubovi na području grada Rijeke",
	authors: ["Branimir Medvedec"] as Author[],
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="en">
			<body className={inter.className}>{children}</body>
		</html>
	)
}
