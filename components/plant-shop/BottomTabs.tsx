'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useRouter, usePathname } from 'next/navigation'
import styles from './BottomTabs.module.css'

const tabs = [
  {
    id: 'home',
    icon: '/images/plant-shop/home.svg',
    label: 'Home',
    path: '/figma/plant-shop'
  },
  {
    id: 'cart',
    icon: '/images/plant-shop/cart.svg',
    label: 'Cart',
    path: '/figma/plant-shop/cart'
  },
  {
    id: 'favorites',
    icon: '/images/plant-shop/like-tab.svg',
    label: 'Favorites',
    path: '/figma/plant-shop/favorites'
  },
  {
    id: 'profile',
    icon: '/images/plant-shop/user.svg',
    label: 'Profile',
    path: '/figma/plant-shop/profile'
  }
]

interface BottomTabsProps {
  onTabChange?: (tabId: string) => void
}

export default function BottomTabs({ onTabChange }: BottomTabsProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [activeTab, setActiveTab] = useState('home')

  useEffect(() => {
    const currentTab = tabs.find((tab) => tab.path === pathname)
    if (currentTab) {
      setActiveTab(currentTab.id)
    }
  }, [pathname])

  const handleTabClick = (tabId: string) => {
    const tab = tabs.find((t) => t.id === tabId)
    if (tab) {
      setActiveTab(tabId)
      router.push(tab.path)
      onTabChange?.(tabId)
    }
  }

  return (
    <nav className={styles.nav}>
      <div className={styles.container}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`${styles.tab} ${activeTab === tab.id ? styles.active : ''}`}
            onClick={() => handleTabClick(tab.id)}
            aria-label={tab.label}
          >
            <Image
              src={tab.icon}
              alt=""
              width={16}
              height={16}
              className={styles.icon}
            />
          </button>
        ))}
      </div>
    </nav>
  )
}
