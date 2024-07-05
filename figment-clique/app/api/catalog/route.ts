import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
    try {
        const catalog = await prisma.catalog.findMany({
            select: {
                id: true,
                title: true,
                image: true,
                image2: true,
                price: true,
                featured: true,
            }
        });
        return NextResponse.json(catalog);
    } 
    catch (error) {
        console.error('Error fetching catalog', error);
        return NextResponse.error();
    }
}


