import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Crypto Test - Quidax API',
  description: 'A Next.js app testing Quidax cryptocurrency API',
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
