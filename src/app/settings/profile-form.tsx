'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { toast } from '@/components/ui/use-toast'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import Image from 'next/image'
import { useUser } from '@clerk/nextjs'

interface ProfileFormProps {
  user: {
    username: string | null
    firstName: string | null
    lastName: string | null
    emailAddress: string | null
    imageUrl: string
  }
}

const profileFormSchema = z.object({
  avatar: z.any(),
  username: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  emailAddress: z.string().email(),
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

export function ProfileForm({ user }: ProfileFormProps) {
  const { user: usr } = useUser()

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(
      profileFormSchema as unknown as Zod.ZodType<string, z.ZodAnyDef, string>,
    ),
    mode: 'onChange',
    defaultValues: {
      username: user.username ?? '',
      firstName: user.firstName ?? '',
      lastName: user.lastName ?? '',
      emailAddress: user.emailAddress ?? '',
    },
  })

  const updateUser = async ({
    firstName,
    lastName,
    username,
  }: ProfileFormValues) => {
    if (!usr) return

    try {
      await usr.update({
        username,
        firstName,
        lastName,
      })
    } catch (error) {
      console.log(error)
    }

    await usr.reload()

    return user
  }

  async function onSubmit(data: ProfileFormValues) {
    await updateUser(data)

    toast({
      title: 'You submitted the following values:',
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card>
          <CardContent className="p-6">
            <FormField
              control={form.control}
              name="avatar"
              render={({ field }) => (
                <div className="flex items-center gap-6">
                  <input
                    type="file"
                    className="sr-only"
                    onChange={field.onChange}
                    ref={field.ref}
                    name={field.name}
                    id={field.name}
                  />

                  <label
                    htmlFor={field.name}
                    className="cursor-pointer hover:opacity-70"
                  >
                    <Image
                      src={user.imageUrl}
                      alt=""
                      width={64}
                      height={64}
                      className="w-16 h-16 rounded-full bg-primary/10"
                    />
                  </label>
                  <div>
                    <span className="text-lg font-medium">Your avatar</span>
                    <p className="text-sm text-muted-foreground">
                      Click on the avatar to upload a custom one from your
                      files.
                    </p>
                  </div>
                </div>
              )}
            />
          </CardContent>
        </Card>

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First name</FormLabel>
                <FormControl>
                  <Input placeholder="John" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last name</FormLabel>
                <FormControl>
                  <Input placeholder="Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="johndoe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="emailAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-mail</FormLabel>
                <FormControl>
                  <Input placeholder="johndoe@email.com" {...field} disabled />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit">Update</Button>
      </form>
    </Form>
  )
}
