'use client'

import { useState } from 'react'

interface Size {
  value: string
  label: string
}

interface SizeSelectorProps {
  sizes: Size[]
  defaultSelected?: string
  onChange?: (size: string) => void
  className?: string
}

export default function SizeSelector({
  sizes,
  defaultSelected,
  onChange,
  className = ''
}: SizeSelectorProps) {
  const [selectedSize, setSelectedSize] = useState(
    defaultSelected || sizes[0]?.value
  )

  const handleSizeChange = (size: string) => {
    setSelectedSize(size)
    onChange?.(size)
  }

  return (
    <div className={`w-full ${className}`}>
      {/* 标题 */}
      <h3 className="font-montserrat mb-3 text-[13px] font-semibold text-black">
        Select size
      </h3>

      {/* 尺寸选择器 */}
      <div className="flex flex-row gap-3">
        {sizes.map((size) => (
          <button
            key={size.value}
            className={`flex items-center justify-center rounded-[10px] px-3 py-2 ${
              selectedSize === size.value
                ? 'bg-[#D3B398] text-white'
                : 'bg-[#F4F4F4] text-[#505050] opacity-50'
            }`}
            onClick={() => handleSizeChange(size.value)}
          >
            <span className="font-montserrat text-[13px] font-medium">
              {size.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
