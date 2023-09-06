import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-lg font-medium">My Resumes</h1>
        <span className="text-sm text-muted-foreground">
          Add or Edit your resumes.
        </span>
      </div>

      <Separator />

      <div className="flex flex-row gap-4 space-x-4">
        <Skeleton className="w-48 aspect-[1/1.4]" />
        <Skeleton className="w-48 aspect-[1/1.4]" />
        <Skeleton className="w-48 aspect-[1/1.4]" />
      </div>
    </div>
  )
}
