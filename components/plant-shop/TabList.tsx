'use client'

import { useState } from 'react'
import styles from './TabList.module.css'

interface Tab {
  id: string
  label: string
}

const tabs: Tab[] = [
  { id: 'all', label: 'All' },
  { id: 'cacti', label: 'Cacti' },
  { id: 'in-pots', label: 'In pots' },
  { id: 'dried-flowers', label: 'Dried flowers' },
  { id: 'in-pots-2', label: 'In pots' }
]

interface TabListProps {
  onTabChange?: (tabId: string) => void
}

export default function TabList({ onTabChange }: TabListProps) {
  const [activeTab, setActiveTab] = useState('cacti')

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId)
    onTabChange?.(tabId)
  }

  return (
    <div className={styles.container}>
      <div className={styles.tabList}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`${styles.tab} ${activeTab === tab.id ? styles.active : ''}`}
            onClick={() => handleTabClick(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  )
}
