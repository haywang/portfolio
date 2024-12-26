import type { Metadata } from 'next'
import './globals.css'
import GA from '@/components/GA'
import { AuthProvider } from '@/contexts/AuthContext'
import ClientLayout from './ClientLayout'

export const metadata: Metadata = {
  title: 'Portfolio',
  description: "Austin's portfolio website"
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  const basePath = process.env.BASE_PATH || ''

  return (
    <html lang="en">
      <head>
        <link
          rel="apple-touch-icon"
          sizes="76x76"
          href={`${basePath}/favicons/apple-touch-icon.png`}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href={`${basePath}/favicons/favicon-32x32.png`}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href={`${basePath}/favicons/favicon-16x16.png`}
        />
        <link rel="manifest" href={`${basePath}/favicons/site.webmanifest`} />
        <GA />
      </head>
      <body className="antialiased">
        <AuthProvider>
          <ClientLayout>{children}</ClientLayout>
        </AuthProvider>
      </body>
    </html>
  )
}
