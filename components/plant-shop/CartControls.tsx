'use client'

import Image from 'next/image'

interface CartControlsProps {
  onAddToCart: () => void
  onToggleFavorite: () => void
  isFavorite?: boolean
  className?: string
}

export default function CartControls({
  onAddToCart,
  onToggleFavorite,
  isFavorite = false,
  className = ''
}: CartControlsProps) {
  return (
    <div
      className={`flex w-full items-center justify-between gap-3 px-6 ${className}`}
    >
      {/* 收藏按钮 */}
      <button
        onClick={onToggleFavorite}
        className="flex h-[52px] w-[52px] items-center justify-center rounded-2xl bg-[#F9F9F9]"
        aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      >
        <div className="flex h-6 w-6 items-center justify-center">
          {isFavorite ? (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="#D3B398"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          ) : (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#000000"
              strokeWidth="2"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          )}
        </div>
      </button>

      {/* 添加购物车按钮 */}
      <button
        onClick={onAddToCart}
        className="flex h-[52px] flex-1 items-center justify-center rounded-xl bg-[#D3B398] text-white"
      >
        <span className="font-montserrat text-[13px] font-semibold">
          Add to Cart
        </span>
      </button>
    </div>
  )
}
