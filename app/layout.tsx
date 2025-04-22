import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'HetMehta Portfolio',
  description: 'Portfolio for my projects experience and others',
  generator: 'HetMehta',
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
