'use server'

import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const getCatalog = async () => {
  try {
    const data = await prisma.catalog.findMany({
      select: {
        id: true,
        title: true,
        image: true,
        image2: true,
        price: true,
        featured: true,
        category: true
      }
    })

    return { data }
  } catch (error) {
    return { error: 'could not fetch data'}
  }
}