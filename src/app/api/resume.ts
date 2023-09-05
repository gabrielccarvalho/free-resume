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

export async function updateTitle(id: number, title: string) {
  try {
    const data = await prisma.resume.update({
      where: {
        id,
      },
      data: {
        title,
      },
    })

    return data
  } catch (err) {
    console.log(err)
  }
}
