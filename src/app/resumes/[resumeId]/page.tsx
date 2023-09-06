'use client'

import { Edition } from '@/containers'
import { usePathname } from 'next/navigation'
import React from 'react'

export default function Resumes() {
  const resumeId = usePathname().split('/')[2] // This will return `/resumes/${resumeId}`, so we need to split it.

  return (
    <div className="flex flex-row w-full h-full">
      <div className="w-1/2">
        <Edition resumeId={resumeId} />
      </div>
      <div className="flex flex-row items-center justify-center w-1/2 bg-muted">
        <div className="w-96 aspect-[1/1.4] bg-white rounded-md"></div>
      </div>
    </div>
  )
}
