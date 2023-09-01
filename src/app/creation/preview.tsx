'use client'

import { Skeleton } from '@/components/ui/skeleton'
import { UserNav } from '@/components/user-nav'
// import { useUser } from '@clerk/nextjs'
// import { useQuery } from '@tanstack/react-query'
import { Suspense } from 'react'

export default function ResumePreview() {
  // const { user, isLoaded } = useUser()

  // const { isLoading } = useQuery({
  //   queryKey: ['connections'],
  //   queryFn: async () => {
  //     return user?.getSessions()
  //   },
  //   enabled: isLoaded && !!user,
  // })

  return (
    <>
      <div className="absolute top-6 right-6">
        <Suspense fallback={<Skeleton className="w-8 h-8 rounded-full" />}>
          <UserNav />
        </Suspense>
      </div>

      <div className="flex flex-col items-center justify-center w-2/3 aspect-[1/1.4]">
        <div className="w-full h-full bg-gray-100 rounded-lg"></div>
      </div>

      {/* {isLoading && (
        <div className="flex flex-col items-center justify-center w-2/3 aspect-[1/1.4]">
          <Skeleton className="w-full h-full" />
        </div>
      )} */}
    </>
  )
}
