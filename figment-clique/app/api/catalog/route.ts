import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
    try {
        const catalog = await prisma.catalog.findMany();
        return NextResponse.json(catalog);
    } catch (error) {
        console.error('Error fetching catalog', error);
        return NextResponse.error("Internal Server Error" , 500);
    }
}

