'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import IPhonePreview from '@/components/ui/IPhonePreview'

export default function PlantShopPreviewPage() {
  const searchParams = useSearchParams()
  const [selectedPage, setSelectedPage] = useState('/figma/plant-shop')

  useEffect(() => {
    const page = searchParams.get('page')
    if (page) {
      setSelectedPage(page)
    }
  }, [searchParams])

  // Different page paths
  const pages = [
    { name: 'Home', path: '/figma/plant-shop' },
    { name: 'Product Detail', path: '/figma/plant-shop/cart' },
    { name: 'Favorites', path: '/figma/plant-shop/favorites' },
    { name: 'Profile', path: '/figma/plant-shop/profile' }
  ]

  // Different devices and colors
  const devices = [
    // { name: 'iPhone 13', color: '#1A1A1A', batteryLevel: 92 },
    { name: 'iPhone 16', color: '#2C2C2C', batteryLevel: 88 }
    // { name: 'iPhone 13 Pro', color: '#4E5851', batteryLevel: 76 },
    // { name: 'iPhone SE', color: '#E7ECEE', batteryLevel: 54 }
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-center text-3xl font-bold">
        Plant Shop Mobile App Preview
      </h1>

      <div className="mb-8">
        <h2 className="mb-4 text-xl font-semibold">Select Page</h2>
        <div className="flex flex-wrap gap-3">
          {pages.map((page) => (
            <Link
              key={page.path}
              href={`/figma/plant-shop-preview?page=${encodeURIComponent(page.path)}`}
              className={`rounded-md px-4 py-2 text-white ${
                selectedPage === page.path
                  ? 'bg-green-800'
                  : 'bg-green-600 hover:bg-green-700'
              }`}
            >
              {page.name}
            </Link>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 xl:grid-cols-2">
        {devices.map((device) => (
          <IPhonePreview
            key={device.name}
            deviceColor={device.color}
            deviceName={device.name}
            batteryLevel={device.batteryLevel}
          >
            <iframe
              src={selectedPage}
              className="h-full w-full border-0"
              title={`${device.name} preview`}
            />
          </IPhonePreview>
        ))}
      </div>
    </div>
  )
}
