'use client'

import ProductImage from '@/components/plant-shop/ProductImage'
import ProductInfo from '@/components/plant-shop/ProductInfo'

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

      {/* 商品名称、价格和评分 - 严格按照设计稿实现 */}
      <ProductInfo
        name="Prickly Pear"
        price={20}
        rating={4.8}
        className="mt-7"
      />
    </div>
  )
}
