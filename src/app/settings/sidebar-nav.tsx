'use client'

import { buttonVariants } from '@/components/ui/button'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

type SidebarNavProps = ComponentProps<'nav'>

const sidebarLinks = [
  { href: '/settings', title: 'Profile' },
  { href: '/settings/connections', title: 'Login Connections' },
  { href: '/settings/billing', title: 'Billing' },
]

export function SidebarNav({ className, ...props }: SidebarNavProps) {
  const pathname = usePathname()

  return (
    <nav className={twMerge('flex flex-col space-y-4', className)} {...props}>
      {sidebarLinks.map((link) => {
        return (
          <Link
            key={link.href}
            href={link.href}
            data-current={pathname === link.href}
            className={twMerge(
              buttonVariants({ variant: 'ghost' }),
              'justify-start hover:bg-slate-900',
              'data-[current=true]:bg-purple-950 data-[current=true]:hover:bg-purple-900',
            )}
          >
            {link.title}
          </Link>
        )
      })}
    </nav>
  )
}
