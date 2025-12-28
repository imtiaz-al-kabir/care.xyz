import { NextResponse } from "next/server";
import { createBooking, getAllBookings } from "@/lib/collections/bookings";
import { sendInvoiceEmail } from "@/lib/sendEmail";

export async function POST(request) {
    try {
        const bookingData = await request.json();
        const booking = await createBooking(bookingData);

        // Send confirmation email/invoice
        try {
            await sendInvoiceEmail(bookingData);
        } catch (emailError) {
            console.error("Failed to send invoice email:", emailError);
            // We don't fail the entire request if email fails
        }

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

export async function GET() {
    try {
        const bookings = await getAllBookings();

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
