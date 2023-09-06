'use client'

import { getSpecificResume } from '@/app/api/resume'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useQuery } from '@tanstack/react-query'

export default function Edition({ resumeId }: { resumeId: string }) {
  console.log(resumeId)

  const { data = [] } = useQuery({
    queryKey: ['resume'],
    queryFn: async () => {
      return getSpecificResume(Number(resumeId))
    },
    notifyOnChangeProps: ['data', 'error'],
  })

  return (
    <>
      <div className="flex flex-col p-12">
        <form>
          <Label>Title</Label>
          <Input className="max-w-xs" name="title" value={data?.title} />
        </form>
      </div>
    </>
  )
}
