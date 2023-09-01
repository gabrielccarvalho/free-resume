import { ReactNode } from 'react'
import ResumePreview from './preview'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="space-y-8 h-[100vh]">
      <div className="flex flex-row h-full bg-slate-400">
        <div className="flex flex-col items-center justify-center w-1/2">
          {children}
        </div>
        <div className="flex flex-col items-center justify-center w-1/2">
          <ResumePreview />
        </div>
      </div>
    </div>
  )
}
