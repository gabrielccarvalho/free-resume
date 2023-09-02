'use client'

import { Button } from '@/components/ui/button'
import { ArrowRightIcon } from '@radix-ui/react-icons'
import Image from 'next/image'
import Link from 'next/link'

export default function Jumbotron() {
  return (
    <div className="flex flex-col items-center gap-8 pt-24 overflow-hidden h-2/3 bg-card">
      <h1 className="z-30 max-w-3xl mb-6 text-6xl font-extrabold leading-loose tracking-tight text-center scroll-m-20 lg:text-6xl">
        Create your professional resume in just a few clicks.
      </h1>
      <p className="max-w-2xl font-sans leading-loose text-center tracking-loose">
        Create your resume using our expert-designed templates that match what
        employers want. It&apos;s simple and takes just minutes – give it a free
        shot now!
      </p>
      <Link href="/settings/resume-list">
        <Button className="gap-2">
          Try it for free! <ArrowRightIcon className="w-5 h-5" />
        </Button>
      </Link>

      <Image
        src="/resume-template.png"
        alt="Resume template"
        width={800}
        height={1140}
        draggable={false}
        className="mt-8 rounded-lg show-up"
      />
    </div>
  )
}
