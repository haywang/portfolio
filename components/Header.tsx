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

export default function Header() {
  const { user, logout } = useAuth()

  return (
    <>
      <div className="w-full flex-none bg-white/95 backdrop-blur transition-colors duration-500 dark:border-slate-50/[0.06] dark:bg-transparent lg:border-b lg:border-slate-900/10">
        <div className="max-w-8xl mx-auto">
          <div className="border-b border-slate-900/10 px-8 py-4 dark:border-slate-300/10 lg:border-0 lg:px-8">
            <div className="relative flex items-center">
              <Link href="/">
                <Image
                  src="/logo.png"
                  alt="logo"
                  width={24}
                  height={24}
                  className="h-6 w-6 rounded-full"
                />
              </Link>

              <div className="relative ml-auto items-center lg:flex">
                <NavigationMenu>
                  <NavigationMenuList>
                    <NavigationMenuItem>
                      <Link href="/ai" legacyBehavior passHref>
                        <NavigationMenuLink
                          className={navigationMenuTriggerStyle()}
                        >
                          AI Application
                        </NavigationMenuLink>
                      </Link>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                      <Link href="/figma" legacyBehavior passHref>
                        <NavigationMenuLink
                          className={navigationMenuTriggerStyle()}
                        >
                          Figma To Code
                        </NavigationMenuLink>
                      </Link>
                    </NavigationMenuItem>
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
