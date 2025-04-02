'use client'

import { usePathname } from 'next/navigation'
import { ChevronLeft, Filter } from 'lucide-react'

interface NavbarProps {
  showBackButton?: boolean
  onFilterClick?: () => void
}

export default function Navbar({
  showBackButton = true,
  onFilterClick
}: NavbarProps) {
  const pathname = usePathname()

  // Get page title based on current path
  const getPageTitle = () => {
    switch (pathname) {
      case '/figma/plant-shop':
        return 'All Plants'
      case '/figma/plant-shop/cart':
        return 'Cart'
      case '/figma/plant-shop/favorites':
        return 'Favorites'
      case '/figma/plant-shop/profile':
        return 'Profile'
      default:
        return 'All Plants'
    }
  }

  return (
    <div className="sticky top-0 z-50 flex h-16 items-center justify-between bg-white px-4">
      {showBackButton && (
        <button className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-gray-100">
          <ChevronLeft className="h-6 w-6" />
        </button>
      )}
      <h1 className="absolute left-1/2 -translate-x-1/2 text-xl font-semibold">
        {getPageTitle()}
      </h1>
      {onFilterClick && (
        <button
          onClick={onFilterClick}
          className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-gray-100"
        >
          <Filter className="h-6 w-6" />
        </button>
      )}
    </div>
  )
}
