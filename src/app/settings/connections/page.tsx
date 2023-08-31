'use client'

import { useSession, useUser } from '@clerk/nextjs'
import { Separator } from '@/components/ui/separator'
import { useQuery } from '@tanstack/react-query'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { Skeleton } from '@/components/ui/skeleton'

dayjs.extend(relativeTime)

export default function LoginConnections() {
  const { user, isLoaded } = useUser()
  const { session: currentSession } = useSession()

  const { data = [], isLoading } = useQuery({
    queryKey: ['connections'],
    queryFn: async () => {
      return user?.getSessions()
    },
    enabled: isLoaded && !!user,
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-lg font-medium">Login Connections</h1>
        <span className="text-sm text-muted-foreground">
          Your currently account active login connections.
        </span>
      </div>

      <Separator />

      {isLoading && (
        <div className="space-y-4">
          <Skeleton className="h-28" />
          <Skeleton className="h-28" />
          <Skeleton className="h-28" />
        </div>
      )}

      <div className="space-y-4">
        {data.map((session) => {
          const isCurrentSession = currentSession?.id === session.id

          return (
            <Card
              className="flex items-center justify-between p-6 h-28"
              key={session.id}
            >
              <div className="flex flex-col gap-1">
                <span className="flex items-center gap-2">
                  {session.latestActivity.deviceType} (
                  {session.latestActivity.browserName}){' '}
                  {isCurrentSession && (
                    <Badge variant="secondary">This device</Badge>
                  )}
                </span>
                <span className="text-sm text-muted-foreground">
                  Last active {dayjs(session.lastActiveAt).fromNow()}
                </span>
              </div>

              <Button variant="destructive" disabled={isCurrentSession}>
                Revoke access
              </Button>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
