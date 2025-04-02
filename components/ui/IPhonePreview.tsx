'use client'

import { ReactNode } from 'react'

// 设备配置接口
interface DeviceConfig {
  width: number
  height: number
  notchWidth: number
  notchHeight: number
  borderRadius: number
  hasHomeButton?: boolean
  dynamicIsland?: boolean
}

// iPhone设备配置
const DEVICE_CONFIGS: Record<string, DeviceConfig> = {
  'iPhone 13': {
    width: 375,
    height: 812,
    notchWidth: 160,
    notchHeight: 32,
    borderRadius: 44
  },
  'iPhone 13 Pro': {
    width: 390,
    height: 844,
    notchWidth: 160,
    notchHeight: 32,
    borderRadius: 44
  },
  'iPhone SE': {
    width: 320,
    height: 568,
    notchWidth: 0,
    notchHeight: 0,
    borderRadius: 32,
    hasHomeButton: true
  },
  'iPhone 16': {
    width: 393,
    height: 852,
    notchWidth: 120, // Dynamic Island
    notchHeight: 36,
    borderRadius: 52,
    dynamicIsland: true
  }
}

interface IPhonePreviewProps {
  children: ReactNode
  deviceColor?: string
  deviceName?: keyof typeof DEVICE_CONFIGS
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

  // 获取设备配置
  const deviceConfig = DEVICE_CONFIGS[deviceName] || DEVICE_CONFIGS['iPhone 13']

  // 是否有动态岛
  const hasDynamicIsland = deviceConfig.dynamicIsland

  // 是否有Home按钮
  const hasHomeButton = deviceConfig.hasHomeButton

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <p className="mb-4 text-center text-sm text-gray-500">{deviceName}</p>

      {/* 设备框架 */}
      <div
        className="relative mx-auto overflow-hidden bg-white shadow-xl"
        style={{
          width: `${deviceConfig.width}px`,
          height: `${deviceConfig.height}px`,
          borderRadius: `${deviceConfig.borderRadius}px`,
          border: `12px solid ${deviceColor}`,
          boxShadow:
            '0 50px 100px -20px rgba(0, 0, 0, 0.25), 0 30px 60px -30px rgba(0, 0, 0, 0.3)',
          padding: '1px'
        }}
      >
        {/* 顶部刘海区域或动态岛 */}
        {deviceConfig.notchWidth > 0 && !hasDynamicIsland && (
          <div
            className="absolute left-1/2 top-0 z-10 -translate-x-1/2 rounded-b-3xl bg-black"
            style={{
              width: `${deviceConfig.notchWidth}px`,
              height: `${deviceConfig.notchHeight}px`
            }}
          ></div>
        )}

        {/* 动态岛 */}
        {hasDynamicIsland && (
          <div
            className="absolute left-1/2 top-2 z-20 -translate-x-1/2 rounded-full bg-black"
            style={{
              width: `${deviceConfig.notchWidth}px`,
              height: `${deviceConfig.notchHeight}px`
            }}
          ></div>
        )}

        {/* 状态栏 - 使用固定高度和背景色 */}
        <div className="absolute left-0 right-0 top-1 z-10 flex h-10 items-center justify-between bg-white px-6 text-xs text-black">
          <span>{formattedTime}</span>
          <div className="flex items-center space-x-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="black">
              <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z" />
            </svg>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="black">
              <path d="M12.01 21.49L23.64 7c-.45-.34-4.93-4-11.64-4C5.28 3 .81 6.66.36 7l11.63 14.49.01.01.01-.01z" />
            </svg>
            <div className="flex items-center">
              <div className="h-3.5 w-6 rounded-sm border border-black p-0.5">
                <div
                  className="h-full rounded-sm bg-black"
                  style={{ width: `${batteryLevel}%` }}
                ></div>
              </div>
              <span className="ml-1">{batteryLevel}%</span>
            </div>
          </div>
        </div>

        {/* 内容区域 - 添加顶部内边距避免与状态栏重叠 */}
        <div
          className="h-full w-full overflow-auto"
          style={{
            paddingTop: hasDynamicIsland ? '48px' : '40px',
            paddingBottom: hasHomeButton ? '20px' : '4px'
          }}
        >
          {children}
        </div>

        {/* 底部指示条或Home按钮 */}
        {hasHomeButton ? (
          <div className="absolute bottom-2 left-1/2 h-10 w-10 -translate-x-1/2 rounded-full border-2 border-gray-300"></div>
        ) : (
          <div className="absolute bottom-2 left-1/2 h-1 w-32 -translate-x-1/2 rounded-full bg-black"></div>
        )}
      </div>
    </div>
  )
}
