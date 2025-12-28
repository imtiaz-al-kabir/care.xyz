import { NextResponse } from "next/server";
import { servicesData } from "@/lib/data";
import { upsertService } from "@/lib/collections/services";

export async function POST() {
    try {
        const results = await Promise.all(
            servicesData.map((service) => {
                const { id, ...data } = service;
                return upsertService(data);
            })
        );

        return NextResponse.json({
            message: "Services seeded successfully",
            count: results.length
        });
    } catch (error) {
        console.error("Seeding error:", error);
        return NextResponse.json(
            { error: "Failed to seed services" },
            { status: 500 }
        );
    }
}
