import { NextResponse } from "next/server";
import { getAllServices } from "@/lib/collections/services";

export async function GET() {
    try {
        const services = await getAllServices();
        return NextResponse.json(services);
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to fetch services" },
            { status: 500 }
        );
    }
}
