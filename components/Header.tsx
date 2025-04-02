'use client'

import * as React from 'react'
import Link from 'next/link'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle
} from '@/components/ui/navigation-menu'
import Image from 'next/image'
import { useAuth } from '@/contexts/AuthContext'
import { Menu, X } from 'lucide-react'

export default function Header() {
  const { user, logout } = useAuth()
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)

  const menuItems = [
    { href: '/ai', label: 'AI App' },
    { href: '/figma', label: 'React NativeApp' }
  ]

  return (
    <>
      <div className="w-full flex-none bg-white/95 backdrop-blur transition-colors duration-500 dark:border-slate-50/[0.06] dark:bg-transparent lg:border-b lg:border-slate-900/10">
        <div className="max-w-8xl mx-auto">
          <div className="border-b border-slate-900/10 px-4 py-4 dark:border-slate-300/10 lg:border-0 lg:px-8">
            <div className="relative flex items-center justify-between">
              <Link href="/">
                <Image
                  src="/logo.png"
                  alt="logo"
                  width={24}
                  height={24}
                  className="h-6 w-6 rounded-full"
                />
              </Link>

              {/* Desktop Navigation */}
              <NavigationMenu className="hidden md:block">
                <NavigationMenuList>
                  {menuItems.map((item) => (
                    <NavigationMenuItem key={item.href}>
                      <Link href={item.href} legacyBehavior passHref>
                        <NavigationMenuLink
                          className={navigationMenuTriggerStyle()}
                        >
                          {item.label}
                        </NavigationMenuLink>
                      </Link>
                    </NavigationMenuItem>
                  ))}
                  {user && (
                    <NavigationMenuItem>
                      <button
                        onClick={logout}
                        className={navigationMenuTriggerStyle()}
                      >
                        Logout
                      </button>
                    </NavigationMenuItem>
                  )}
                </NavigationMenuList>
              </NavigationMenu>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-gray-100 sm:hidden"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed inset-y-0 right-0 z-50 w-64 transform bg-white shadow-lg transition-transform duration-300 ease-in-out lg:hidden ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex h-full flex-col">
          <div className="flex h-16 items-center justify-between border-b px-4">
            <span className="text-lg font-semibold">Menu</span>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-gray-100"
              aria-label="Close menu"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <nav className="flex flex-1 flex-col">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="border-b border-gray-100 px-6 py-4 text-lg hover:bg-gray-50"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            {user && (
              <button
                onClick={() => {
                  logout()
                  setIsMenuOpen(false)
                }}
                className="border-b border-gray-100 px-6 py-4 text-left text-lg hover:bg-gray-50"
              >
                Logout
              </button>
            )}
          </nav>
        </div>
      </div>

      {/* Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 transition-opacity lg:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </>
  )
}
