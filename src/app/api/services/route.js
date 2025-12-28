import { NextResponse } from "next/server";
import { getAllServices } from "@/lib/collections/services";

export async function GET() {
    try {
        const services = await getAllServices();
        return NextResponse.json(services);
    } catch (error) {
        console.error("API Services Error:", error);
        return NextResponse.json(
            {
                error: "Failed to fetch services",
                details: error.message,
                stack: process.env.NODE_ENV === "development" ? error.stack : undefined
            },
            { status: 500 }
        );
    }
}
