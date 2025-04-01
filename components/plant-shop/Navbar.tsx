'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import styles from './Navbar.module.css'

interface NavbarProps {
  title?: string
  showBackButton?: boolean
  showFilterIcon?: boolean
  onFilterClick?: () => void
}

export default function Navbar({
  title = 'All plants',
  showBackButton = true,
  showFilterIcon = true,
  onFilterClick
}: NavbarProps) {
  const router = useRouter()

  return (
    <nav className={styles.navbar}>
      {showBackButton && (
        <button
          className={styles.backButton}
          onClick={() => router.back()}
          aria-label="Go back"
        >
          <Image
            src="/images/plant-shop/back-icon.svg"
            alt="Back"
            width={20}
            height={18}
          />
        </button>
      )}

      <h1 className={styles.title}>{title}</h1>

      {showFilterIcon && (
        <button
          className={styles.filterButton}
          onClick={onFilterClick}
          aria-label="Filter"
        >
          <Image
            src="/images/plant-shop/filter-icon.svg"
            alt="Filter"
            width={20}
            height={20}
          />
        </button>
      )}
    </nav>
  )
}
