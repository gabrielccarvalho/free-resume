'use client'

import { useUser } from '@clerk/nextjs'
import { Separator } from '@/components/ui/separator'
import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { Skeleton } from '@/components/ui/skeleton'

dayjs.extend(relativeTime)

export default function ResumeList() {
  const { user, isLoaded } = useUser()

  const { isLoading } = useQuery({
    queryKey: ['connections'],
    queryFn: async () => {
      return user?.getSessions()
    },
    enabled: isLoaded && !!user,
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-lg font-medium">My Resumes</h1>
        <span className="text-sm text-muted-foreground">
          Manage your created resumes.
        </span>
      </div>

      <Separator />

      {isLoading && (
        <div className="flex flex-row gap-4 space-x-4">
          <Skeleton className="w-64 h-96" />
          <Skeleton className="w-64 h-96" />
          <Skeleton className="w-64 h-96" />
        </div>
      )}
    </div>
  )
}
