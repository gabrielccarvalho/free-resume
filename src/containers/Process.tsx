'use client'

import { Skeleton } from '@/components/ui/skeleton'
import { ArrowRightIcon } from '@radix-ui/react-icons'

export default function Process() {
  return (
    <div className="flex flex-col items-center justify-center gap-12 pb-32 mt-16">
      <div className="flex flex-col justify-center gap-4 text-center align-center">
        <h3 className="z-30 text-4xl font-bold tracking-tight text-center scroll-m-20 lg:text-4xl">
          Creating your resume has never been easier!
        </h3>
        <p className="max-w-xl mx-auto text-center">
          Save time with our simple 4-step resume builder. Say goodbye to the
          struggles of formatting in Word. Swiftly create an ideal resume that
          employers will truly appreciate.
        </p>
      </div>
      <div className="flex flex-row items-center gap-12 mt-12">
        <div className="flex flex-col items-center gap-4">
          <Skeleton className="w-[210px] h-[297px]" />
          <div className="flex flex-row items-center justify-center w-12 h-12 text-white bg-blue-500 rounded-full">
            <p className="font-bold">1</p>
          </div>
          <p className="font-semibold">Pick a template</p>
        </div>

        <ArrowRightIcon className="w-8 h-8 mb-24 text-blue-500" />

        <div className="flex flex-col items-center gap-4">
          <Skeleton className="w-[210px] h-[297px]" />
          <div className="flex flex-row items-center justify-center w-12 h-12 text-white bg-blue-500 rounded-full">
            <p className="font-bold">2</p>
          </div>
          <p className="font-semibold">Edit your resume</p>
        </div>

        <ArrowRightIcon className="w-8 h-8 mb-24 text-blue-500" />

        <div className="flex flex-col items-center gap-4">
          <Skeleton className="w-[210px] h-[297px]" />
          <div className="flex flex-row items-center justify-center w-12 h-12 text-white bg-blue-500 rounded-full">
            <p className="font-bold">3</p>
          </div>
          <p className="font-semibold">Customize the design</p>
        </div>

        <ArrowRightIcon className="w-8 h-8 mb-24 text-blue-500" />

        <div className="flex flex-col items-center gap-4">
          <Skeleton className="w-[210px] h-[297px]" />
          <div className="flex flex-row items-center justify-center w-12 h-12 text-white bg-blue-500 rounded-full">
            <p className="font-bold">4</p>
          </div>
          <p className="font-semibold">Download it</p>
        </div>
      </div>
    </div>
  )
}
