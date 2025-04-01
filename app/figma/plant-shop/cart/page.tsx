'use client'

import ProductImage from '@/components/plant-shop/ProductImage'

export default function CartPage() {
  return (
    <div>
      {/* 商品图片展示 - 严格按照设计稿实现 */}
      <div className="w-full">
        <ProductImage
          src="/images/plant-shop/prickly-pear.png"
          alt="Prickly Pear"
        />
      </div>
    </div>
  )
}
