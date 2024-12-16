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

export default function Header() {
  return (
    <>
      <div className="supports-backdrop-blur:bg-white/60 sticky top-0 z-40 w-full flex-none bg-white/95 backdrop-blur transition-colors duration-500 dark:border-slate-50/[0.06] dark:bg-transparent lg:z-50 lg:border-b lg:border-slate-900/10">
        <div className="max-w-8xl mx-auto">
          <div className="border-b border-slate-900/10 px-8 py-4 dark:border-slate-300/10 lg:border-0 lg:px-8">
            <div className="relative flex items-center">
              <Image
                src="/logo.png"
                alt="logo"
                width={24}
                height={24}
                className="h-6 w-6 rounded-full"
              />
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
