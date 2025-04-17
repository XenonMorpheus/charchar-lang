import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Pwede Ba Kita Ligawan?",
  description: "🥺👉👈",
  generator: "vercel",
  metadataBase: new URL("https://proposaltoi.netlify.app"),
  openGraph: {
    title: "Pwede Ba Kita Ligawan?",
    description: "🥺👉👈",
    type: "website",
  },
  twitter: {
    title: "Pwede Ba Kita Ligawan?",
    description: "🥺👉👈",
    card: "summary_large_image",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}


import './globals.css'