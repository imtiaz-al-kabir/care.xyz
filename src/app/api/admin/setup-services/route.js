import { NextResponse } from "next/server";
import { servicesData } from "@/lib/data";
import { upsertService } from "@/lib/collections/services";

export async function GET() {
    return await seedServices();
}

export async function POST() {
    return await seedServices();
}

async function seedServices() {
    try {
        const results = await Promise.all(
            servicesData.map((service) => {
                const { id, ...data } = service;
                return upsertService(data);
            })
        );

        return NextResponse.json({
            success: true,
            message: "Services seeded successfully",
            count: results.length
        });
    } catch (error) {
        console.error("Seeding error:", error);
        return NextResponse.json(
            { success: false, error: "Failed to seed services", details: error.message },
            { status: 500 }
        );
    }
}
