'use client'

import { handler } from '@/app/api/resume'
import { useUser } from '@clerk/nextjs'
import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { Button } from './ui/button'
import Link from 'next/link'
import {
  DownloadIcon,
  MoreHorizontal,
  PencilIcon,
  ShareIcon,
} from 'lucide-react'
import { PlusIcon } from '@radix-ui/react-icons'

export function Resumes() {
  const { user } = useUser()

  const { data = [] } = useQuery({
    queryKey: ['resume'],
    queryFn: async () => {
      return handler(user?.id as string)
    },
    enabled: !user?.updatedAt,
  })

  return (
    <>
      <div className="flex flex-row">
        {data?.map((resume, i) => (
          <div
            className="flex flex-row items-start justify-center gap-4"
            key={i}
          >
            <div className="flex flex-col bg-gray-200 rounded-md w-48 aspect-[1/1.4] m-2 p-2 hover:cursor-pointer">
              {/* <p>{JSON.stringify(resume.content)}</p> */}
            </div>
            <div className="flex flex-col justify-between h-full pt-1 pb-4">
              <div className="flex flex-col gap-1">
                <Link
                  href={`/resume/${resume.id}`}
                  className="hover:text-blue-500"
                >
                  <p className="font-sans text-2xl">{resume.title}</p>
                </Link>
                <p className="font-sans text-xs text-gray-500 ">
                  {dayjs(resume.updatedAt.toISOString()).format(
                    'D MMMM, HH:mm',
                  )}
                </p>
              </div>
              <div className="flex flex-col">
                <Button
                  variant="link"
                  className="items-center justify-start gap-2 text-gray-600 hover:text-blue-500 hover:no-underline"
                >
                  <PencilIcon className="w-4 h-4 text-blue-500" />
                  Edit
                </Button>

                <Button
                  variant="link"
                  className="items-center justify-start gap-2 text-gray-600 hover:text-blue-500 hover:no-underline"
                >
                  <ShareIcon className="w-4 h-4 text-blue-500" />
                  Share a link
                </Button>

                <Button
                  variant="link"
                  className="items-center justify-start gap-2 text-gray-600 hover:text-blue-500 hover:no-underline"
                >
                  <DownloadIcon className="w-4 h-4 text-blue-500" />
                  Download PDF
                </Button>

                <Button
                  variant="link"
                  className="items-center justify-start gap-2 text-gray-600 hover:text-blue-500 hover:no-underline"
                >
                  <MoreHorizontal className="w-4 h-4 text-blue-500" />
                  more
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export function AddResume() {
  return (
    <>
      <div className="flex flex-row">
        <div className="flex flex-row items-start justify-center gap-4 group hover:cursor-pointer">
          <div className="flex flex-col border-2 border-gray-200 rounded-md w-48 aspect-[1/1.4] m-2 items-center justify-center">
            <div className="flex flex-row items-center justify-center w-16 h-16 bg-gray-100 rounded-full group-hover:bg-blue-500">
              <PlusIcon className="w-8 h-8 text-gray-300 font-extralight group-hover:text-white" />
            </div>
          </div>
          <div className="flex flex-col justify-between h-full pt-1 pb-4">
            <div className="flex flex-col gap-1">
              <p className="font-sans text-2xl text-gray-500">New Resume</p>
              <p className="max-w-xs font-sans text-xs text-gray-500">
                Create a new resume for each job application. Double your
                chances of getting hired!
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
