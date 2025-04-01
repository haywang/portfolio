'use client'

import { ReactNode } from 'react'

interface IPhonePreviewProps {
  children: ReactNode
  deviceColor?: string
  deviceName?: string
  className?: string
  batteryLevel?: number
}

export default function IPhonePreview({
  children,
  deviceColor = '#1A1A1A',
  deviceName = 'iPhone 13',
  batteryLevel = 80,
  className = ''
}: IPhonePreviewProps) {
  // 获取当前时间
  const now = new Date()
  const hours = now.getHours()
  const minutes = now.getMinutes()
  const formattedTime = `${hours}:${minutes < 10 ? '0' + minutes : minutes}`

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <p className="mb-4 text-center text-sm text-gray-500">{deviceName}</p>

      {/* 设备框架 */}
      <div
        className="relative mx-auto overflow-hidden rounded-[44px] bg-black shadow-xl"
        style={{
          width: '375px',
          height: '812px',
          border: `12px solid ${deviceColor}`,
          boxShadow:
            '0 50px 100px -20px rgba(0, 0, 0, 0.25), 0 30px 60px -30px rgba(0, 0, 0, 0.3)',
          padding: '1px'
        }}
      >
        {/* 顶部刘海区域 */}
        <div className="absolute left-1/2 top-0 z-10 h-8 w-40 -translate-x-1/2 rounded-b-3xl bg-black"></div>

        {/* 状态栏 */}
        <div className="absolute left-0 right-0 top-0 z-10 flex h-10 items-center justify-between px-6 text-xs text-white">
          <span>{formattedTime}</span>
          <div className="flex items-center space-x-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
              <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z" />
            </svg>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
              <path d="M12.01 21.49L23.64 7c-.45-.34-4.93-4-11.64-4C5.28 3 .81 6.66.36 7l11.63 14.49.01.01.01-.01z" />
            </svg>
            <div className="flex items-center">
              <div className="h-3.5 w-6 rounded-sm border border-white p-0.5">
                <div
                  className="h-full rounded-sm bg-white"
                  style={{ width: `${batteryLevel}%` }}
                ></div>
              </div>
              <span className="ml-1">{batteryLevel}%</span>
            </div>
          </div>
        </div>

        {/* 内容区域 */}
        <div className="h-full w-full overflow-auto">{children}</div>

        {/* 底部指示条 */}
        <div className="absolute bottom-2 left-1/2 h-1 w-32 -translate-x-1/2 rounded-full bg-white"></div>
      </div>
    </div>
  )
}
