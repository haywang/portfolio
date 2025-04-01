'use client'

import { useState } from 'react'
import Image from 'next/image'
import styles from './Filter.module.css'

interface FilterOption {
  id: string
  label: string
}

const filterOptions: FilterOption[] = [
  { id: 'popularity', label: 'Popularity' },
  { id: 'newest', label: 'Newest' },
  { id: 'price-low', label: 'Price: Low to High' },
  { id: 'price-high', label: 'Price: High to Low' }
]

interface FilterProps {
  onFilterChange?: (filterId: string) => void
}

export default function Filter({ onFilterChange }: FilterProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedFilter, setSelectedFilter] = useState(filterOptions[0])

  const handleFilterClick = (filter: FilterOption) => {
    setSelectedFilter(filter)
    setIsOpen(false)
    onFilterChange?.(filter.id)
  }

  return (
    <div className={styles.container}>
      <button
        className={styles.filterButton}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span className={styles.filterText}>{selectedFilter.label}</span>
        <Image
          src="/images/plant-shop/arrow-down.svg"
          alt=""
          width={12}
          height={12}
          className={`${styles.arrow} ${isOpen ? styles.open : ''}`}
        />
      </button>

      {isOpen && (
        <div className={styles.dropdown} role="listbox">
          {filterOptions.map((option) => (
            <button
              key={option.id}
              className={`${styles.option} ${
                selectedFilter.id === option.id ? styles.selected : ''
              }`}
              onClick={() => handleFilterClick(option)}
              role="option"
              aria-selected={selectedFilter.id === option.id}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
