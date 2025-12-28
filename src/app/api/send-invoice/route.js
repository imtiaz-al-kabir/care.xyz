import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { sendInvoiceEmail } from "@/lib/sendEmail";
import { findUserById } from "@/lib/collections/users";
import { authOptions } from "@/lib/auth";

export async function POST(request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
        }

        const { bookingData } = await request.json();

        if (!bookingData) {
            return NextResponse.json({ success: false, message: "Missing booking data" }, { status: 400 });
        }

        // Trigger email
        await sendInvoiceEmail({
            ...bookingData,
            email: session.user.email,
            name: session.user.name
        });

        return NextResponse.json({ success: true, message: "Invoice sent" });
    } catch (error) {
        console.error("Failed to send invoice:", error);
        return NextResponse.json({ success: false, message: "Failed to send invoice" }, { status: 500 });
    }
}
