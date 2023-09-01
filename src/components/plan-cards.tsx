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
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ArrowRightIcon, CheckIcon } from '@radix-ui/react-icons'

interface iCardProps {
  name: string
  value: string
  currency: string
  benefits: string[]
}

export default function Cards({ name, value, currency, benefits }: iCardProps) {
  return (
    <Card className="w-[350px] min-h-[600px] flex flex-col justify-between">
      <div className="flex flex-col gap-8">
        <CardHeader>
          <CardTitle>{name}</CardTitle>
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
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </div>
      <CardFooter className="flex justify-center mb-4">
        <Button className="flex flex-row items-center justify-center w-full gap-2">
          Tell me more <ArrowRightIcon className="w-4 h-4" />
        </Button>
      </CardFooter>
    </Card>
  )
}
