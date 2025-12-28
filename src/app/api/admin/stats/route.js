import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { countBookings } from "@/lib/collections/bookings";
import { countPayments, getSucceededPayments } from "@/lib/collections/payments";
import { countUsers } from "@/lib/collections/users";

export async function GET() {
    try {
        const session = await getServerSession(authOptions);

        if (!session || session.user.role !== "admin") {
            return NextResponse.json(
                { success: false, message: "Unauthorized" },
                { status: 401 }
            );
        }

        const [totalBookings, totalPayments, totalUsers, payments] = await Promise.all([
            countBookings(),
            countPayments(),
            countUsers(),
            getSucceededPayments(),
        ]);

        const totalRevenue = payments.reduce((sum, payment) => sum + payment.amount, 0);

        return NextResponse.json({
            success: true,
            stats: {
                totalBookings,
                totalPayments,
                totalUsers,
                totalRevenue,
            },
        });
    } catch (error) {
        console.error("Stats fetch error:", error);
        return NextResponse.json(
            { success: false, message: "Failed to fetch stats" },
            { status: 500 }
        );
    }
}
