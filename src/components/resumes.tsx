'use client'

import React from 'react'
import { handler, updateTitle, deleteResume } from '@/app/api/resume'
import { useUser } from '@clerk/nextjs'
import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { Button } from './ui/button'
import {
  DownloadIcon,
  FileUpIcon,
  FilesIcon,
  MoreHorizontal,
  PencilIcon,
  ShareIcon,
  TrashIcon,
} from 'lucide-react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { PlusIcon } from '@radix-ui/react-icons'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu'

export function Resumes() {
  const { user } = useUser()
  const [title, setTitle] = React.useState('')

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
            <Link
              href={`/resume/${resume.authorId.substring(5, 16)}/${resume.id}`}
            >
              <div className="flex flex-col bg-gray-200 rounded-md w-48 aspect-[1/1.4] m-2 p-2 hover:cursor-pointer">
                {/* <p>{JSON.stringify(resume.content)}</p> */}
              </div>
            </Link>
            <div className="flex flex-col justify-between h-full pt-1 pb-4">
              <div className="flex flex-col gap-1">
                <Dialog>
                  <DialogTrigger asChild>
                    <p className="p-0 font-sans text-2xl border-none hover:text-blue-500 hover:cursor-pointer">
                      {title || resume.title}
                    </p>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Edit resume&apos;s title</DialogTitle>
                      <DialogDescription>
                        Change your resume&apos;s title here. Click save when
                        you&apos;re done.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="flex flex-col py-4">
                      <div className="flex flex-col items-center justify-center gap-4">
                        <Input
                          id="title"
                          placeholder={resume.title}
                          value={title}
                          onChange={(e) => setTitle(e.currentTarget.value)}
                          className="col-span-3"
                        />
                      </div>
                    </div>
                    <DialogFooter className="flex flex-col items-center justify-center md:justify-center lg:justify-center">
                      <DialogTrigger asChild>
                        <Button
                          type="submit"
                          className="self-center"
                          onClick={() => updateTitle(resume.id, title)}
                        >
                          Save changes
                        </Button>
                      </DialogTrigger>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                <p className="font-sans text-xs text-gray-500">
                  Updated{' '}
                  {dayjs(resume.updatedAt.toISOString()).format(
                    'D MMMM, HH:mm',
                  )}
                </p>
              </div>
              <div className="flex flex-col">
                <Button
                  variant="link"
                  className="items-center justify-start gap-2 pl-0 text-gray-600 hover:text-blue-500 hover:no-underline"
                >
                  <PencilIcon className="w-4 h-4 text-blue-500" />
                  Edit
                </Button>

                <Button
                  variant="link"
                  className="items-center justify-start gap-2 pl-0 text-gray-600 hover:text-blue-500 hover:no-underline"
                >
                  <ShareIcon className="w-4 h-4 text-blue-500" />
                  Share a link
                </Button>

                <Button
                  variant="link"
                  className="items-center justify-start gap-2 pl-0 text-gray-600 hover:text-blue-500 hover:no-underline"
                >
                  <DownloadIcon className="w-4 h-4 text-blue-500" />
                  Download PDF
                </Button>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="link"
                      className="items-center justify-start gap-2 pl-0 text-gray-600 hover:text-blue-500 hover:no-underline"
                    >
                      <MoreHorizontal className="w-4 h-4 text-blue-500" />
                      more
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="py-2 border border-gray-200 rounded-md shadow-lg">
                    <DropdownMenuGroup className="flex flex-col gap-2">
                      <Button
                        variant="link"
                        className="items-center justify-start gap-2 text-gray-600 hover:text-blue-500 hover:no-underline"
                      >
                        <FileUpIcon className="w-4 h-4 text-blue-500" />
                        Export to TXT
                      </Button>

                      <Button
                        variant="link"
                        className="items-center justify-start gap-2 text-gray-600 hover:text-blue-500 hover:no-underline"
                      >
                        <FileUpIcon className="w-4 h-4 text-blue-500" />
                        Export to DOCX
                      </Button>

                      <Button
                        variant="link"
                        className="items-center justify-start gap-2 text-gray-600 hover:text-blue-500 hover:no-underline"
                      >
                        <FilesIcon className="w-4 h-4 text-blue-500" />
                        Make a copy
                      </Button>

                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="link"
                            className="items-center justify-start gap-2 text-gray-600 hover:text-blue-500 hover:no-underline"
                          >
                            <TrashIcon className="w-4 h-4 text-blue-500" />
                            Delete
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Are you absolutely sure?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will
                              permanently delete your resume.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => deleteResume(resume.id)}
                            >
                              Continue
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
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
