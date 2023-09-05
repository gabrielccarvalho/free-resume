'use server'

import { prisma } from '@/lib/db'

export async function handler(id: string) {
  try {
    const data = await prisma.resume.findMany({
      where: {
        authorId: id,
      },
    })

    return data
  } catch (err) {
    console.log(err)
  }
}
