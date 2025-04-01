'use client'

import { useState } from 'react'
import Image from 'next/image'
import styles from './ProductList.module.css'

interface Product {
  id: string
  name: string
  image: string
  backgroundColor: string
  rating: number
  size: string
  price: number
  liked?: boolean
}

const products: Product[] = [
  {
    id: '1',
    name: 'Echeveria',
    image: '/images/plant-shop/echeveria.jpg',
    backgroundColor: '#F2F7FF',
    rating: 5.0,
    size: 'From 3 Inch',
    price: 25
  },
  {
    id: '2',
    name: 'Prickly Pear',
    image: '/images/plant-shop/prickly-pear.jpg',
    backgroundColor: '#FCF0F0',
    rating: 4.8,
    size: 'From 5 Inch',
    price: 20
  },
  {
    id: '3',
    name: 'Sansevieria',
    image: '/images/plant-shop/Sansevieria.jpg',
    backgroundColor: '#EBF4EE',
    rating: 4.5,
    size: 'From 8 Inch',
    price: 20
  }
]

export default function ProductList() {
  const [likedProducts, setLikedProducts] = useState<Set<string>>(new Set())

  const toggleLike = (productId: string) => {
    setLikedProducts((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(productId)) {
        newSet.delete(productId)
      } else {
        newSet.add(productId)
      }
      return newSet
    })
  }

  return (
    <div className={styles.grid}>
      {products.map((product) => (
        <div key={product.id} className={styles.card}>
          <div
            className={styles.imageContainer}
            style={{ backgroundColor: product.backgroundColor }}
          >
            <Image
              src={product.image}
              alt={product.name}
              fill
              className={styles.productImage}
            />
            <button
              className={styles.likeButton}
              onClick={() => toggleLike(product.id)}
              aria-label={likedProducts.has(product.id) ? 'Unlike' : 'Like'}
            >
              <Image
                src="/images/plant-shop/heart.svg"
                alt=""
                width={16}
                height={16}
                className={likedProducts.has(product.id) ? styles.liked : ''}
              />
            </button>
          </div>

          <div className={styles.content}>
            <div className={styles.header}>
              <h3 className={styles.name}>{product.name}</h3>
              <div className={styles.rating}>
                <Image
                  src="/images/plant-shop/star.svg"
                  alt=""
                  width={12}
                  height={12}
                />
                <span className={styles.ratingNumber}>{product.rating}</span>
              </div>
            </div>
            <p className={styles.size}>{product.size}</p>
            <p className={styles.price}>{product.price} $</p>
          </div>
        </div>
      ))}
    </div>
  )
}
