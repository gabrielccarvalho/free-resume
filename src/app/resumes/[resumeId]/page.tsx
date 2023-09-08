'use client'

import { getSpecificResume } from '@/app/api/resume'
import { Edition } from '@/containers'
import { Resume } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'
import { usePathname } from 'next/navigation'
import React from 'react'

export default function Resumes() {
  const resumeId = usePathname().split('/')[2] // This will return `/resumes/${resumeId}`, so we need to split it.

  const { data = [] as unknown as Resume } = useQuery({
    queryKey: ['resume'],
    queryFn: async () => {
      return getSpecificResume(Number(resumeId))
    },
    notifyOnChangeProps: ['data', 'error'],
    retry: 2,
  })

  return (
    <div className="flex flex-row w-full h-full">
      <div className="w-2/5">
        <Edition data={data as Resume} />
      </div>
      <div className="flex flex-row items-center justify-center w-3/5 bg-muted">
        <div className="w-3/5 aspect-[1/1.4] bg-white rounded-md"></div>
      </div>
    </div>
  )
}
