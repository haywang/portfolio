'use client'

import { usePathname } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { shouldUseCustomLayout } from './routes'

export default function ClientLayout({
  children
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const useCustomLayout = shouldUseCustomLayout(pathname)

  if (useCustomLayout) {
    return children
  }

  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  )
}
