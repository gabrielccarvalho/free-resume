import { ReactNode } from 'react'

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-6xl p-6 mx-auto">{children}</main>
    </div>
  )
}
