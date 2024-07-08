import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const stocks = await prisma.stocks.findMany({
      select: {
        catalogTitle: true,
        small: true,
        medium: true,
        large: true,
        xl: true,
        xxl: true,
      },
    });
        return NextResponse.json(stocks);
    } 
    catch (error) {
        console.error('Error fetching catalog', error);
        return NextResponse.error();
    }
}


