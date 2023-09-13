'use client'

import React from 'react'
import Image from 'next/image'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Resume } from '@prisma/client'
import { useForm } from 'react-hook-form'
import { Textarea } from '@/components/ui/textarea'
import { toast } from '@/components/ui/use-toast'
import { updateResume } from '@/app/api/resume'
import { Button } from '@/components/ui/button'
import { JsonValue } from '@prisma/client/runtime/library'
import { PencilIcon, Trash } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'
import { ScrollArea } from '@/components/ui/scroll-area'

// interface EditionFormProps {
//   user: {
//     username: string | null
//     firstName: string | null
//     lastName: string | null
//     emailAddress: string | null
//     imageUrl: string
//   }
// }

const editionFormSchema = z.object({
  id: z.number().optional(),
  title: z.any().optional(),
  description: z.string().optional(),
  firstName: z.string(),
  lastName: z.string(),
  emailAddress: z.string().email(),
  phoneNumber: z.string(),
  country: z.string(),
  city: z.string(),
  avatar: z.string().optional(),
  jobTitle: z.string(),
  professionalSummary: z.string().optional(),
  employmentHistory: z
    .array(
      z.object({
        title: z.string(),
        employer: z.string(),
        city: z.string(),
        startDate: z.string(),
        endDate: z.string(),
        description: z.string(),
      }),
    )
    .optional(),
  educationHistory: z
    .array(
      z.object({
        school: z.string(),
        city: z.string(),
        degree: z.string(),
        startDate: z.date(),
        endDate: z.date(),
        description: z.string(),
      }),
    )
    .optional(),
  skills: z
    .array(
      z.object({
        name: z.string(),
        level: z.string(),
      }),
    )
    .optional(),
  courses: z
    .array(
      z.object({
        name: z.string(),
        institution: z.string(),
        startDate: z.date(),
        endDate: z.date(),
        description: z.string(),
      }),
    )
    .optional(),
  languages: z
    .array(
      z.object({
        name: z.string(),
        level: z.string(),
      }),
    )
    .optional(),
  socialLinks: z
    .array(
      z.object({
        name: z.string(),
        url: z.string(),
      }),
    )
    .optional(),
  hobbies: z.array(z.string()).optional(),
  references: z
    .array(
      z.object({
        name: z.string(),
        company: z.string(),
        phoneNumber: z.string(),
        emailAddress: z.string(),
      }),
    )
    .optional(),
})

type ResumeFormValues = z.infer<typeof editionFormSchema>

export default function Edition({ data }: { data: Resume }) {
  const [preview, setPreview] = React.useState<string | undefined>('')
  const form = useForm<ResumeFormValues>({
    resolver: zodResolver(
      editionFormSchema as unknown as Zod.ZodType<string, z.ZodAnyDef, string>,
    ),
    mode: 'onChange',
    defaultValues: {
      title: data.title ?? '',
      description: data.description ?? '',
      firstName: data.firstName ?? '',
      lastName: data.lastName ?? '',
      emailAddress: data.emailAddress ?? '',
      phoneNumber: data.phoneNumber ?? '',
      country: data.country ?? '',
      city: data.city ?? '',
      avatar: data.avatar ?? '',
      professionalSummary: data.professionalSummary ?? '',
      jobTitle: data.jobTitle ?? '',
      // employmentHistory: data.employmentHistory ?? [],
      // educationHistory: data.educationHistory ?? [],
      // skills: data.skills ?? [],
      // courses: data.courses ?? [],
      // languages: data.languages ?? [],
      // socialLinks: data.socialLinks ?? [],
      hobbies: data.hobbies ?? [],
      // references: data.references ?? [],
    },
  })

  React.useEffect(() => {
    form.reset(data as unknown as ResumeFormValues)
  }, [form, data])

  async function onSubmit(data: ResumeFormValues) {
    await updateResume(
      data.id as number,
      data as unknown as Record<string, string | number | JsonValue[] | Date>,
    )

    toast({
      title: 'Success',
      duration: 2000,
      description: 'Resume updated successfully!',
    })
  }

  async function getPreview(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    let base64String = ''

    if (!file) return
    const reader = new FileReader()
    reader.onloadend = () => {
      // Use a regex to remove data url part
      base64String = (reader.result as string).replace(
        /^data:image\/png;base64,/,
        '',
      )

      setPreview(base64String)
    }
    reader.readAsDataURL(file)
  }

  async function onErrors(errors: any) {
    console.log(errors)
  }

  return (
    <>
      <ScrollArea className="flex flex-col h-screen max-w-3xl p-12 mx-auto">
        <div className="flex flex-col items-center justify-center w-full pb-12">
          <h1 className="text-2xl font-bold">{data.title}</h1>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit, onErrors)}>
            <div className="flex flex-col gap-6">
              <h2 className="text-xl font-bold">Personal Details</h2>
              <div className="flex flex-row max-w-2xl gap-10">
                <FormField
                  control={form.control}
                  name="jobTitle"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <Label className="text-xs text-gray-400">
                        Desired Job Title
                      </Label>
                      <FormControl>
                        <Input
                          className="flex-1 w-full text-sm bg-gray-200 border-0 rounded-none focus-visible:ring-transparent focus-visible:border-blue-500 focus-visible:border-b-2"
                          placeholder="Senior Software Developer"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="avatar"
                  render={({ field }) => (
                    <div className="flex items-center w-full gap-6">
                      <input
                        type="file"
                        className="sr-only"
                        accept="image/*"
                        onChange={(e) => {
                          field.onChange()
                          getPreview(e)
                        }}
                        ref={field.ref}
                        name={field.name}
                        id={field.name}
                      />

                      <label
                        htmlFor={field.name}
                        className="cursor-pointer hover:opacity-70"
                      >
                        {field.value ? (
                          <Image
                            src={field.value}
                            alt="profile image"
                            width={64}
                            height={64}
                            className="w-16 h-16 rounded-md bg-primary/10"
                          />
                        ) : (
                          <Skeleton className="w-16 h-16 rounded-md" />
                        )}
                      </label>
                      <div className="flex flex-col">
                        <div className="group">
                          <Button
                            variant="link"
                            onClick={(e) => {
                              e.preventDefault()
                            }}
                            className="items-center justify-start gap-2 pl-0 text-blue-500 hover:text-blue-700 hover:no-underline"
                          >
                            <PencilIcon className="w-4 h-4 text-blue-500 group-hover:text-blue-700" />
                            Edit Photo
                          </Button>
                        </div>

                        <div className="group">
                          <Button
                            variant="link"
                            onClick={(e) => {
                              e.preventDefault()
                            }}
                            className="items-center justify-start gap-2 pl-0 text-gray-400 group-hover:text-red-500 hover:no-underline"
                          >
                            <Trash className="w-4 h-4 text-gray-400 group-hover:text-red-500" />
                            Delete
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                />
              </div>

              <div className="flex flex-row max-w-2xl gap-10">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <Label className="text-xs text-gray-400">
                        First Name
                      </Label>
                      <FormControl>
                        <Input
                          className="text-sm bg-gray-200 border-0 rounded-none focus-visible:ring-transparent focus-visible:border-blue-500 focus-visible:border-b-2"
                          placeholder="John"
                          {...field}
                          size={96}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <Label className="text-xs text-gray-400">Last Name</Label>
                      <FormControl>
                        <Input
                          className="text-sm bg-gray-200 border-0 rounded-none focus-visible:ring-transparent focus-visible:border-blue-500 focus-visible:border-b-2"
                          placeholder="Doe"
                          {...field}
                          size={96}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex flex-row max-w-2xl gap-10">
                <FormField
                  control={form.control}
                  name="emailAddress"
                  render={({ field }) => (
                    <FormItem>
                      <Label className="text-xs text-gray-400">Email</Label>
                      <FormControl>
                        <Input
                          className="text-sm bg-gray-200 border-0 rounded-none focus-visible:ring-transparent focus-visible:border-blue-500 focus-visible:border-b-2"
                          placeholder="johndoe@email.com"
                          size={96}
                          type="email"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <Label className="text-xs text-gray-400">
                        Phone Number
                      </Label>
                      <FormControl>
                        <Input
                          className="text-sm bg-gray-200 border-0 rounded-none focus-visible:ring-transparent focus-visible:border-blue-500 focus-visible:border-b-2"
                          placeholder="+55 11 99999-9999"
                          size={96}
                          type="tel"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex flex-row max-w-2xl gap-10">
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <Label className="text-xs text-gray-400">Country</Label>
                      <FormControl>
                        <Input
                          className="text-sm bg-gray-200 border-0 rounded-none focus-visible:ring-transparent focus-visible:border-blue-500 focus-visible:border-b-2"
                          placeholder="Brazil"
                          {...field}
                          size={96}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <Label className="text-xs text-gray-400">City</Label>
                      <FormControl>
                        <Input
                          className="text-sm bg-gray-200 border-0 rounded-none focus-visible:ring-transparent focus-visible:border-blue-500 focus-visible:border-b-2"
                          placeholder="São Paulo"
                          {...field}
                          size={96}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col gap-4 mt-4">
                <div>
                  <h2 className="text-xl font-bold">Professional Summary</h2>
                  <Label className="text-xs text-gray-400">
                    Write 2-4 short & energetic sentences to interest the
                    reader! Mention your role, experience & most importantly -
                    your biggest achievements, best qualities and skills.
                  </Label>
                </div>
                <div className="flex flex-row gap-10">
                  <div className="flex flex-col w-full gap-2">
                    <FormField
                      control={form.control}
                      name="professionalSummary"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Textarea
                              className="h-40 text-sm bg-gray-200 border-0 rounded-none resize-none focus-visible:ring-transparent focus-visible:border-blue-500 focus-visible:border-b-2"
                              placeholder="eg. Senior Software Developer with 5+ years of experience in building scalable web applications.
                              I have a passion for solving complex problems and creating smart solutions. I am a team player and a fast learner."
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <Button type="submit" className="self-center">
                  Submit
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </ScrollArea>
    </>
  )
}
