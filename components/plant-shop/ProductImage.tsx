'use client'

import Image from 'next/image'

interface ProductImageProps {
  src: string
  alt: string
  className?: string
}

export default function ProductImage({
  src,
  alt,
  className = ''
}: ProductImageProps) {
  return (
    <div className={`relative aspect-square w-full ${className}`}>
      {/* 浅灰色背景，底部圆角 */}
      <div className="absolute bottom-0 h-full w-full rounded-b-[24px] bg-[#FAFAFA]" />

      {/* 产品图片 */}
      <Image
        src={src}
        alt={alt}
        fill
        sizes="100vw"
        className="relative z-10 object-contain"
      />
    </div>
  )
}
