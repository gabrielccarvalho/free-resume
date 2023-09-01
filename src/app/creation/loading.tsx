import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center w-1/3 h-2/3">
      <Skeleton className="w-full h-full" />
    </div>
  )
}
