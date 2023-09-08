'use server'

import { prisma } from '@/lib/db'
import { JsonValue } from '@prisma/client/runtime/library'

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

export async function getSpecificResume(id: number) {
  try {
    const data = await prisma.resume.findUnique({
      where: {
        id,
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

export async function updateResume(
  id: number,
  data: Record<string, string | number | JsonValue[] | Date>,
) {
  try {
    const resume = await prisma.resume.update({
      where: {
        id,
      },
      data,
    })

    return resume
  } catch (err) {
    console.log(err)
  }
}

export async function deleteResume(id: number) {
  try {
    const data = await prisma.resume.delete({
      where: {
        id,
      },
    })

    return data
  } catch (err) {
    console.log(err)
  }
}
