'use client'

import Navbar from '@/components/plant-shop/Navbar'
import BottomTabs from '@/components/plant-shop/BottomTabs'

export default function PlantShopLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen">
      <Navbar />
      {children}
      <BottomTabs />
    </div>
  )
}
