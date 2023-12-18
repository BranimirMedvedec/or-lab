import type { MDXComponents } from "mdx/types"
import Image from "next/image"

// This file allows you to provide custom React components
// to be used in MDX files. You can import and use any
// React component you want, including inline styles,
// components from other libraries, and more.

export function useMDXComponents(components: MDXComponents): MDXComponents {
	return {
		h1: ({ children }) => (
			<h1 style={{ fontSize: "32px", marginBottom: "16px" }}>
				{children}
			</h1>
		),
		h2: ({ children }) => (
			<h2 style={{ fontSize: "24px", marginBottom: "16px" }}>
				{children}
			</h2>
		),
		p: ({ children }) => (
			<p style={{ fontSize: "16px", marginBottom: "16px" }}>{children}</p>
		),
		hr: ({ children }) => (
			<hr style={{ color: "#e1e4e8", marginTop: "16px" }}>{children}</hr>
		),
		a: ({ href, children }) => (
			<a
				href={href}
				style={{ color: "#0366d6", textDecoration: "none" }}>
				{children}
			</a>
		),
		...components,
	}
}
