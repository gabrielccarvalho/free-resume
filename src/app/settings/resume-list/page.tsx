'use client'

import { Separator } from '@/components/ui/separator'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import React from 'react'
import { Resumes, AddResume } from '@/components/resumes'

dayjs.extend(relativeTime)

export default function ResumeList() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-lg font-medium">My Resumes</h1>
        <span className="text-sm text-muted-foreground">
          Add or Edit your resumes.
        </span>
      </div>

      <Separator />

      <div className="flex flex-row gap-24 space-x-4">
        <Resumes />
        <AddResume />
      </div>
    </div>
  )
}
