'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function FavoritesGuide() {
  const router = useRouter()

  return (
    <div className="relative flex h-full min-h-[calc(100vh-94px)] w-full overflow-hidden bg-[#D3B398]">
      {/* Background ellipse */}
      <div className="bg-gradient-radial absolute left-1/2 top-1/4 h-[463px] w-[463px] -translate-x-1/2 -translate-y-1/2 rounded-full from-white/100 to-white/0" />

      {/* Woman image */}
      <div className="absolute left-1/2 top-[283px] flex h-[463px] -translate-x-1/2 -translate-y-1/2 items-center justify-center">
        <Image
          src="/images/plant-shop/woman-favorites.png"
          alt="Woman with plants"
          width={694}
          height={463}
          style={{
            height: '463px',
            width: 'auto',
            maxWidth: 'none'
          }}
          priority
        />
      </div>

      {/* Story indicators */}
      <div className="absolute left-4 right-4 top-4 flex gap-2">
        <div className="h-1 flex-1 rounded-full bg-white/60">
          <div className="h-full w-full rounded-full bg-white" />
        </div>
        <div className="h-1 flex-1 rounded-full bg-white/60" />
        <div className="h-1 flex-1 rounded-full bg-white/60" />
        <div className="h-1 flex-1 rounded-full bg-white/60" />
      </div>

      {/* Close button */}
      <button
        onClick={() => router.back()}
        className="absolute right-4 top-8 flex h-6 w-6 items-center justify-center rounded-full bg-white"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          stroke="#BFC2C8"
          strokeWidth="1.5"
        >
          <path d="M1 1L13 13M1 13L13 1" />
        </svg>
      </button>

      {/* Bottom section */}
      <div className="absolute bottom-0 left-0 right-0">
        {/* Bottom curve with content */}
        <div className="relative">
          {/* Text content - positioned above the curve */}
          <div className="absolute bottom-24 left-0 right-0 z-10 px-4 text-center">
            <h1 className="text-2xl font-bold text-black">
              Add a flower
              <br />
              To favorites
            </h1>
            <p className="mt-2 text-base font-medium text-black/50">
              So that you do not lose
              <br />a new friend for home
            </p>
          </div>

          {/* Bottom curve image */}
          <Image
            src="/images/plant-shop/bottom-curve.svg"
            alt="Bottom curve"
            width={390}
            height={300}
            className="w-full"
          />

          {/* Heart button */}
          <button className="absolute left-1/2 top-0 flex h-[86px] w-[86px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl bg-white shadow-lg transition-transform hover:scale-105 active:scale-95">
            <svg
              width="36"
              height="36"
              viewBox="0 0 24 24"
              fill="white"
              stroke="#BFC2C8"
              strokeWidth="3"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
