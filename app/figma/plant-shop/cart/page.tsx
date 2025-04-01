'use client'

import ProductImage from '@/components/plant-shop/ProductImage'
import ProductInfo from '@/components/plant-shop/ProductInfo'
import SizeSelector from '@/components/plant-shop/SizeSelector'

export default function CartPage() {
  const sizes = [
    { value: '5', label: '5 Inch' },
    { value: '10', label: '10 Inch' },
    { value: '25', label: '25 Inch' },
    { value: '50', label: '50 Inch' }
  ]

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

      {/* 尺寸选择 */}
      <SizeSelector sizes={sizes} defaultSelected="10" className="mt-5 px-6" />
    </div>
  )
}
