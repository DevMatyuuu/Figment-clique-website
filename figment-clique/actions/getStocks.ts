"use server"

import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const getStocks = async () => {
  try {
    const data = await prisma.stocks.findMany({
      select: {
        id: true,
        catalogId: true,
        small: true,
        medium: true,
        large: true,
        xl: true,
        xxl: true,
      },
    })

    return { stocks: data }
  } catch (error) {
    return { error: 'could not fetch data'}
  }
}