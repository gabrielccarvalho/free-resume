'use client'

import React from 'react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'
import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons'
// import { useUser } from '@clerk/nextjs'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command'

const languages = [
  {
    value: 'english',
    label: 'English',
  },
  {
    value: 'portuguese',
    label: 'Portuguese',
  },
  {
    value: 'spanish',
    label: 'Spanish',
  },
  {
    value: 'french',
    label: 'French',
  },
]

export default function ResumeCreation() {
  // const { user } = useUser()
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState('')

  return (
    <div className="flex flex-col items-center w-full h-full gap-4 p-8 rounded-r-md bg-background">
      <h2 className="text-2xl font-normal text-center">
        Gabriel&apos;s Resume
      </h2>

      <div className="flex flex-col items-center justify-center w-48">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              role="combobox"
              aria-expanded={open}
              className="w-[200px] justify-center"
            >
              {value
                ? languages.find((language) => language.value === value)?.label
                : 'Select language...'}
              <CaretSortIcon className="w-4 h-4 ml-2 opacity-50 shrink-0" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder="Search language..." className="h-9" />
              <CommandEmpty>No languages found.</CommandEmpty>
              <CommandGroup>
                {languages.map((language) => (
                  <CommandItem
                    key={language.value}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? '' : currentValue)
                      setOpen(false)
                    }}
                  >
                    {language.label}
                    <CheckIcon
                      className={cn(
                        'ml-auto h-4 w-4',
                        value === language.value ? 'opacity-100' : 'opacity-0',
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
      </div>

      <div className="flex flex-row w-full max-w-3xl mt-12">
        <h3 className="text-xl font-bold text-center">Personal Information</h3>
      </div>
    </div>
  )
}
