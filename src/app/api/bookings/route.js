import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { createBooking, getAllBookings, getBookingsCollection } from "@/lib/collections/bookings";
import { authOptions } from "@/lib/auth";

export async function POST(request) {
    try {
        const bookingData = await request.json();
        const booking = await createBooking(bookingData);

        return NextResponse.json({
            success: true,
            booking,
        });
    } catch (error) {
        console.error("Booking creation error:", error);
        return NextResponse.json(
            { success: false, message: "Failed to create booking" },
            { status: 500 }
        );
    }
}

export async function GET(request) {
    try {
        const session = await getServerSession(authOptions);

        const { searchParams } = new URL(request.url);
        const userId = searchParams.get("userId");

        let bookings;
        if (session?.user?.role === "admin" && !userId) {
            bookings = await getAllBookings();
        } else {
            const targetId = userId || session?.user?.id;
            if (!targetId) {
                return NextResponse.json({ success: true, bookings: [] });
            }
            const collection = await getBookingsCollection();
            bookings = await collection.find({ userId: targetId }).sort({ createdAt: -1 }).toArray();
        }

        return NextResponse.json({
            success: true,
            bookings,
        });
    } catch (error) {
        console.error("Bookings fetch error:", error);
        return NextResponse.json(
            { success: false, message: "Failed to fetch bookings" },
            { status: 500 }
        );
    }
}
