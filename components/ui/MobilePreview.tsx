'use client'

import { ReactNode } from 'react'

interface MobilePreviewProps {
  children: ReactNode
  deviceColor?: string
  deviceName?: string
  className?: string
}

export default function MobilePreview({
  children,
  deviceColor = '#000000',
  deviceName = 'iPhone 13',
  className = ''
}: MobilePreviewProps) {
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <p className="mb-4 text-center text-sm text-gray-500">{deviceName}</p>

      {/* 设备框架 */}
      <div
        className="relative mx-auto overflow-hidden rounded-[40px] bg-white shadow-xl"
        style={{
          width: '375px',
          height: '812px',
          border: `10px solid ${deviceColor}`,
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
        }}
      >
        {/* 顶部刘海 */}
        <div className="absolute left-1/2 top-0 h-6 w-40 -translate-x-1/2 rounded-b-xl bg-black"></div>

        {/* 内容区域 */}
        <div className="h-full w-full overflow-auto">{children}</div>
      </div>
    </div>
  )
}
