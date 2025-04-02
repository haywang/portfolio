'use client'

import { useState, useEffect } from 'react'
import FavoritesGuide from '@/components/plant-shop/FavoritesGuide'

export default function FavoritesPage() {
  const [showGuide, setShowGuide] = useState(true)
  const [hasSeenGuide, setHasSeenGuide] = useState(false)

  useEffect(() => {
    const hasSeenGuideStorage = localStorage.getItem('hasSeenFavoritesGuide')
    if (hasSeenGuideStorage) {
      setShowGuide(false)
      setHasSeenGuide(true)
    }
  }, [])

  const handleCloseGuide = () => {
    setShowGuide(false)
    setHasSeenGuide(true)
    localStorage.setItem('hasSeenFavoritesGuide', 'true')
  }

  if (showGuide && !hasSeenGuide) {
    return <FavoritesGuide />
  }

  return (
    <div className="flex flex-col pb-12">
      <div className="p-4">
        <h1 className="text-2xl font-bold">My Favorites</h1>
        {/* Add your favorites list content here */}
      </div>
    </div>
  )
}
