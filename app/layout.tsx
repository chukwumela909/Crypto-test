import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Crypto Test - Market Dashboard',
  description: 'A Next.js app displaying cryptocurrency market data',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
