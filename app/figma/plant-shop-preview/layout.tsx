'use client'

import Link from 'next/link'

export default function PlantShopPreviewLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100">
      <header className="border-b border-gray-200 bg-white shadow-sm">
        <div className="container mx-auto flex items-center justify-between p-4">
          <h1 className="text-xl font-bold">Plant Shop Preview</h1>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <Link
                  href="/figma/plant-shop"
                  className="text-green-600 hover:text-green-800"
                >
                  Return to App
                </Link>
              </li>
              <li>
                <Link
                  href="/figma/plant-shop-preview"
                  className="text-green-600 hover:text-green-800"
                >
                  Device Preview
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main>{children}</main>

      <footer className="border-t border-gray-200 bg-white py-4 text-center text-sm text-gray-500">
        <div className="container mx-auto">
          <p>Plant Shop Mobile App Preview - Design Simulator</p>
        </div>
      </footer>
    </div>
  )
}
