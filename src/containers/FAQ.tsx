/* eslint-disable react/no-unescaped-entities */
'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import Link from 'next/link'

export default function FAQ() {
  return (
    <div className="flex flex-col items-center justify-center gap-12 py-24">
      <h2 className="z-30 text-4xl font-bold tracking-tight text-center scroll-m-20 lg:text-4xl">
        Frequently Asked Questions
      </h2>
      <div className="flex flex-col items-center justify-center w-1/2">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>
              How can I create my resume for free?
            </AccordionTrigger>
            <AccordionContent>
              FreeResume has a few different tools you can use 100% for free
              without entering any credit card details.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>
              Can I download my resume to PDF or Word?
            </AccordionTrigger>
            <AccordionContent>
              After crafting your resume, you've got several breezy options for
              sharing it and kickstarting your job hunt. You can snag a PDF,
              DOCX (Word), or TXT version of your resume effortlessly, whether
              it's straight from your Dashboard or the Resume Editor. It's a
              cinch to get your job applications rolling!
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>
              How can I create a custom resume?
            </AccordionTrigger>
            <AccordionContent>
              Our resume templates are crafted to seamlessly adapt to your
              content, ensuring they maintain a polished appearance across all
              our design options.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <div className="flex flex-col items-center justify-center w-1/2">
        <p className="max-w-2xl mx-auto text-center text-gray-900">
          Didn't find what you're looking for? — Use our{' '}
          <Link href="/faq" className="text-blue-500">
            FAQ
          </Link>
        </p>
      </div>
    </div>
  )
}
