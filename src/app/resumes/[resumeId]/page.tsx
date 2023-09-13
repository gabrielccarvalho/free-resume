'use client'

import { getSpecificResume } from '@/app/api/resume'
import { Button } from '@/components/ui/button'
import { Edition } from '@/containers'
import { Resume } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'
import { usePathname } from 'next/navigation'

import dayjs from 'dayjs'
import * as htmlToImage from 'html-to-image'
import { jsPDF as JsPDF } from 'jspdf'
import {
  FileUpIcon,
  FilesIcon,
  Link,
  MoreHorizontal,
  TrashIcon,
} from 'lucide-react'
import Image from 'next/image'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu'

export default function Resumes() {
  const resumeId = usePathname().split('/')[2] // This will return `/resumes/${resumeId}`, so we need to split it.

  const { data = [] as unknown as Resume } = useQuery({
    queryKey: ['resume'],
    queryFn: async () => {
      return getSpecificResume(Number(resumeId))
    },
    notifyOnChangeProps: ['data', 'error'],
    retry: 2,
  })

  // interface EmploymentHistoryType {
  //   city: string
  //   title: string
  //   employer: string
  //   endDate: Date
  //   startDate: Date
  //   description: string
  // }

  function print() {
    htmlToImage
      .toPng(document.getElementById('printableDiv') as HTMLElement, {
        quality: 1,
      })
      .then(function (dataUrl) {
        const link = document.createElement('a')
        link.download = 'my-image-name.jpeg'
        const pdf = new JsPDF()
        const imgProps = pdf.getImageProperties(dataUrl)
        const pdfWidth = pdf.internal.pageSize.getWidth()
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width
        pdf.addImage(dataUrl, 'PNG', 0, 0, pdfWidth, pdfHeight)
        pdf.save('resume.pdf')
      })
  }

  return (
    <div className="flex flex-row w-full h-full">
      <div className="w-2/5">
        <Edition data={data as Resume} />
      </div>
      <div className="flex flex-col items-center justify-center w-3/5 gap-3 bg-muted">
        <div className="flex justify-end w-3/5 gap-3">
          <Button className="self-center" onClick={print}>
            Download PDF
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="self-center">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="py-2 mt-2 bg-white border border-gray-200 rounded-md shadow-lg">
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
                  <Link className="w-4 h-4 text-blue-500" />
                  Share a Link
                </Button>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div
          className="w-3/5 aspect-[1/1.4] bg-white rounded-md items-center flex flex-col p-12 oswald gap-4"
          id="printableDiv"
        >
          <div className="flex flex-row w-full gap-4">
            <Image
              src={data?.avatar ?? ''}
              alt="Avatar"
              width={64}
              height={64}
              className="rounded-full"
            />
            <div className="flex flex-col gap-2">
              <h2 className="text-2xl font-medium">{`${data?.firstName} ${data?.lastName}`}</h2>
              <p className="text-sm text-gray-500">{data?.jobTitle}</p>
            </div>
          </div>
          <div className="flex flex-col w-full mt-4">
            <h3 className="text-lg font-medium">Summary</h3>
            <p className="mt-2 text-sm font-light text-gray-600">
              {data?.professionalSummary}
            </p>
          </div>
          <div className="flex flex-col w-full">
            <h3 className="text-lg font-medium">Employment History</h3>
            {data?.employmentHistory &&
              data.employmentHistory.map((item: any, i) => (
                <div className="flex flex-col w-full mt-2" key={i}>
                  <h4 className="font-extralight text-md">{`${item.title} at ${item.employer}, ${item.city}`}</h4>
                  <p className="text-xs text-gray-400">
                    {`${dayjs(item.startDate).format('MMMM YYYY')} - ${dayjs(
                      item.endDate,
                    ).format('MMMM YYYY')}`}
                  </p>
                  <p className="max-w-lg mt-2 text-sm font-light text-gray-600">
                    {item.description}
                  </p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}
