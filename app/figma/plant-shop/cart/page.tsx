'use client'

import { useState } from 'react'
import ProductImage from '@/components/plant-shop/ProductImage'
import ProductInfo from '@/components/plant-shop/ProductInfo'
import SizeSelector from '@/components/plant-shop/SizeSelector'
import ProductDescription from '@/components/plant-shop/ProductDescription'
import CartControls from '@/components/plant-shop/CartControls'

export default function CartPage() {
  const [isFavorite, setIsFavorite] = useState(false)

  const sizes = [
    { value: '5', label: '5 Inch' },
    { value: '10', label: '10 Inch' },
    { value: '25', label: '25 Inch' },
    { value: '50', label: '50 Inch' }
  ]

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite)
  }

  const handleAddToCart = () => {
    alert('Added to cart!')
  }

  return (
    <div className="flex flex-col pb-12">
      <div className="flex-1">
        {/* 商品图片展示 */}
        <div className="w-full">
          <ProductImage
            src="/images/plant-shop/prickly-pear.png"
            alt="Prickly Pear"
          />
        </div>

        {/* 商品名称、价格和评分 */}
        <ProductInfo
          name="Prickly Pear"
          price={20}
          rating={4.8}
          className="mt-7"
        />

        {/* 尺寸选择 */}
        <SizeSelector
          sizes={sizes}
          defaultSelected="10"
          className="mt-5 px-6"
        />

        {/* 商品描述 */}
        <ProductDescription
          description="Prickly pear is a drought-resistant and hardy cactus that blooms with yellow-golden flowers in summer."
          className="mt-5 px-6"
        />
      </div>

      {/* 底部添加购物车控件 */}
      <CartControls
        onAddToCart={handleAddToCart}
        onToggleFavorite={handleToggleFavorite}
        isFavorite={isFavorite}
        className="mt-6"
      />
    </div>
  )
}
