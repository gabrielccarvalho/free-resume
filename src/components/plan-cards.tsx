'use client'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { ArrowRightIcon, CheckIcon } from '@radix-ui/react-icons'
import Link from 'next/link'

interface iCardProps {
  name: string
  value: string
  currency: string
  benefits: string[]
}

export default function Cards({ name, value, currency, benefits }: iCardProps) {
  return (
    <Card className="w-[350px] min-h-[500px] flex flex-col justify-between bg-slate-950 ">
      <div className="flex flex-col gap-8">
        <CardHeader>
          <CardTitle className="text-white">{name}</CardTitle>
          <CardDescription>
            {currency}
            {value} /month
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col p-6">
          <ul className="space-y-4">
            {benefits.map((benefit) => (
              <li className="flex items-center gap-2" key={benefit}>
                <CheckIcon className="w-6 h-6 text-emerald-500" />
                <span className="text-gray-300">{benefit}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </div>
      <CardFooter className="flex justify-center mb-4">
        <Link href="/settings/billing">
          <Button
            variant="outline"
            className="flex flex-row items-center justify-center w-full gap-2 text-white"
          >
            Tell me more <ArrowRightIcon className="w-4 h-4" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
