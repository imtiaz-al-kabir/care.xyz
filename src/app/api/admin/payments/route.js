import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getAllPayments } from "@/lib/collections/payments";

export async function GET() {
    try {
        const session = await getServerSession(authOptions);

        if (!session || session.user.role !== "admin") {
            return NextResponse.json(
                { success: false, message: "Unauthorized" },
                { status: 401 }
            );
        }

        const payments = await getAllPayments();

        return NextResponse.json({
            success: true,
            payments,
        });
    } catch (error) {
        console.error("Payments fetch error:", error);
        return NextResponse.json(
            { success: false, message: "Failed to fetch payments" },
            { status: 500 }
        );
    }
}
