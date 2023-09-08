'use client'

import React from 'react'
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
        startDate: z.date(),
        endDate: z.date(),
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

  return (
    <>
      <div className="flex flex-col max-w-3xl p-12 mx-auto">
        <div className="flex flex-col items-center justify-center w-full pb-12">
          <h1 className="text-2xl font-bold">{data.title}</h1>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <h2 className="text-xl font-bold">Personal Details</h2>
              <div className="flex flex-row max-w-2xl gap-10">
                <FormField
                  control={form.control}
                  name="jobTitle"
                  render={({ field }) => (
                    <FormItem>
                      <Label className="text-xs text-gray-400">
                        Desired Job Title
                      </Label>
                      <FormControl>
                        <Input
                          className="text-sm bg-gray-200 border-0 rounded-none focus-visible:ring-transparent focus-visible:border-blue-500 focus-visible:border-b-2"
                          placeholder="Senior Software Developer"
                          {...field}
                          size={96}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                {/* <FormField
                  control={form.control}
                  name="jobTitle"
                  render={({ field }) => (
                    <FormItem>
                      <Label className="text-xs text-gray-400">
                        Desired Job Title
                      </Label>
                      <FormControl>
                        <Input
                          className="text-sm bg-gray-200 border-0 rounded-none focus-visible:ring-transparent focus-visible:border-blue-500 focus-visible:border-b-2"
                          placeholder="Desired Job Title"
                          {...field}
                          size={96}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                /> */}
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
                          {...field}
                          size={96}
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
                              className="text-sm bg-gray-200 border-0 rounded-none focus-visible:ring-transparent focus-visible:border-blue-500 focus-visible:border-b-2"
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
      </div>
    </>
  )
}
