import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createBooking, getBookingsCollection } from "@/lib/collections/bookings";
import { updatePayment, getPaymentBySessionId } from "@/lib/collections/payments";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_placeholder");

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const sessionId = searchParams.get("session_id");

        if (!sessionId) {
            return NextResponse.json({ success: false, message: "Session ID required" }, { status: 400 });
        }

        // 1. Check if booking already exists for this session
        const bookingsColl = await getBookingsCollection();
        const existingBooking = await bookingsColl.findOne({ stripeSessionId: sessionId });

        if (existingBooking) {
            return NextResponse.json({ success: true, message: "Booking already exists", booking: existingBooking });
        }

        // 2. Fetch session from Stripe to get metadata
        const session = await stripe.checkout.sessions.retrieve(sessionId);

        if (session.payment_status !== "paid") {
            return NextResponse.json({ success: false, message: "Payment not completed" }, { status: 400 });
        }

        // 3. Get booking data from metadata
        const bookingData = JSON.parse(session.metadata.bookingData);
        const userId = session.metadata.userId;

        // 4. Create the booking (fallback)
        const booking = await createBooking({
            ...bookingData,
            userId: userId,
            stripeSessionId: sessionId,
            status: "Confirmed",
        });

        // 5. Update payment record
        await updatePayment(
            { stripeSessionId: sessionId },
            {
                bookingId: booking._id.toString(),
                stripePaymentIntentId: session.payment_intent,
                status: "succeeded",
                paymentMethod: session.payment_method_types?.[0] || "card",
            }
        );

        return NextResponse.json({
            success: true,
            message: "Booking synced successfully",
            booking,
        });
    } catch (error) {
        console.error("Session verification error:", error);
        return NextResponse.json(
            { success: false, message: "Failed to verify session" },
            { status: 500 }
        );
    }
}
