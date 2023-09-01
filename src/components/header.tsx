'use client'

import Link from 'next/link'
import { Logo } from './logo'
import { Separator } from './ui/separator'
// import { ResumeSwitch } from './resume-switcher'
import { Button } from './ui/button'
import { UserNav } from './user-nav'
import { useUser } from '@clerk/nextjs'
import { Suspense } from 'react'
import { Skeleton } from './ui/skeleton'
import { NavLink } from './nav-link'
// import { Notifications } from './notifications'

export function Header() {
  const { isSignedIn } = useUser()
  return (
    <div className="z-50 flex items-center justify-between h-16 px-6 border-b navbar">
      <div className="z-50 flex items-center gap-4">
        <Link href="/">
          <Logo className="w-8 h-8" />
        </Link>

        {/* <Separator orientation="vertical" className="h-5" />

        <ResumeSwitch /> */}

        <Separator orientation="vertical" className="h-5" />

        <nav className="flex items-center space-x-6">
          <NavLink href="/services">Services</NavLink>
          <NavLink href="/templates">Templates</NavLink>
          <NavLink href="/examples">Examples</NavLink>
        </nav>
      </div>

      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm">
          Feedback
        </Button>

        {/* <Separator orientation="vertical" className="h-5" />

        <nav className="flex items-center space-x-6">
          <NavLink className="text-xs font-normal" href="/examples/dashboard">
            Changelog
          </NavLink>
          <NavLink className="text-xs font-normal" href="/examples/dashboard">
            Help
          </NavLink>
          <NavLink className="text-xs font-normal" href="/examples/dashboard">
            Docs
          </NavLink>
        </nav> */}

        <Separator orientation="vertical" className="h-5" />

        {/* <ModeToggle /> */}
        {/* <Notifications />

        <Separator orientation="vertical" className="h-5" /> */}

        <Suspense fallback={<Skeleton className="w-8 h-8 rounded-full" />}>
          {isSignedIn ? (
            <UserNav />
          ) : (
            <Link href="/auth/sign-in">
              <Button variant="default" size="sm">
                Sign in
              </Button>
            </Link>
          )}
        </Suspense>
      </div>
    </div>
  )
}
