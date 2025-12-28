import { NextResponse } from "next/server";
import { getBookingById, updateBooking, deleteBooking } from "@/lib/collections/bookings";

export async function GET(request, { params }) {
    try {
        const { id } = await params;
        const booking = await getBookingById(id);

        if (!booking) {
            return NextResponse.json(
                { success: false, message: "Booking not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            booking,
        });
    } catch (error) {
        console.error("Booking fetch error:", error);
        return NextResponse.json(
            { success: false, message: "Failed to fetch booking" },
            { status: 500 }
        );
    }
}

export async function PATCH(request, { params }) {
    try {
        const { id } = await params;
        const updateData = await request.json();

        const booking = await updateBooking(id, updateData);

        if (!booking) {
            return NextResponse.json(
                { success: false, message: "Booking not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            booking,
        });
    } catch (error) {
        console.error("Booking update error:", error);
        return NextResponse.json(
            { success: false, message: "Failed to update booking" },
            { status: 500 }
        );
    }
}

export async function DELETE(request, { params }) {
    try {
        const { id } = await params;
        const result = await deleteBooking(id);

        if (result.deletedCount === 0) {
            return NextResponse.json(
                { success: false, message: "Booking not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            message: "Booking deleted successfully",
        });
    } catch (error) {
        console.error("Booking deletion error:", error);
        return NextResponse.json(
            { success: false, message: "Failed to delete booking" },
            { status: 500 }
        );
    }
}
