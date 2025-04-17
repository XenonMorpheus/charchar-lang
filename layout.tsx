import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Pwede Ba Kita Ligawan?',
  description: '🥺👉👈',
  generator: 'vercel',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
