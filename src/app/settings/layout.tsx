import { ReactNode } from 'react'
import { SidebarNav } from './sidebar-nav'
import { Header } from '@/components/header'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="space-y-8">
      <Header />
      {/* <div className="flex flex-col items-center justify-center p-4 space-y-1">
        <h1 className="text-3xl font-semibold">Settings</h1>
      </div> */}

      {/* <Separator /> */}

      <div className="grid grid-cols-[15rem_1fr] items-start gap-8 p-2">
        <SidebarNav />
        {children}
      </div>
    </div>
  )
}
