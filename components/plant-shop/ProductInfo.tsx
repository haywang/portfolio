'use client'

interface ProductInfoProps {
  name: string
  price: number
  rating: number
  className?: string
}

export default function ProductInfo({
  name,
  price,
  rating,
  className = ''
}: ProductInfoProps) {
  return (
    <div className={`w-full px-6 ${className}`}>
      {/* 商品名称和价格在同一行 */}
      <div className="mb-2 flex items-center justify-between">
        <h1 className="font-montserrat text-[28px] font-bold text-black">
          {name}
        </h1>
        <span className="font-montserrat text-[24px] font-medium text-black">
          {price} $
        </span>
      </div>

      {/* 商品星级评分 */}
      <div className="flex items-center gap-1">
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8 1L10.0306 5.08754L14.5 5.87336L11.25 9.02746L12.0611 13.5L8 11.3875L3.93893 13.5L4.75 9.02746L1.5 5.87336L5.96938 5.08754L8 1Z"
            fill="#FFBB56"
          />
        </svg>
        <span className="font-montserrat text-[12px] font-semibold text-[#FFBB56]">
          {rating.toFixed(1).replace('.', ',')}
        </span>
      </div>
    </div>
  )
}
