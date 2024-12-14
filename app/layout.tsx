import type { Metadata } from 'next'
import './globals.css'
import GA from '@/components/GA'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Portfolio',
  description: "Austin\'s portfolio website"
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
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
      <body className={`antialiased`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
