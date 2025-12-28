import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createBooking } from "@/lib/collections/bookings";
import { updatePayment } from "@/lib/collections/payments";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_placeholder");
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || "";

export async function POST(request) {
    try {
        const body = await request.text();
        const signature = request.headers.get("stripe-signature");

        let event;

        try {
            event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
        } catch (err) {
            console.error("Webhook signature verification failed:", err.message);
            return NextResponse.json(
                { error: "Webhook signature verification failed" },
                { status: 400 }
            );
        }

        // Handle the event
        switch (event.type) {
            case "checkout.session.completed":
                const session = event.data.object;

                // Get booking data from metadata
                const bookingData = JSON.parse(session.metadata.bookingData);
                const userId = session.metadata.userId;

                // Create the booking
                const booking = await createBooking({
                    ...bookingData,
                    userId: userId,
                    stripeSessionId: session.id, // Add this to prevent double creation
                    status: "Confirmed", // Set as confirmed since payment succeeded
                });

                // Update payment record
                await updatePayment(
                    { stripeSessionId: session.id },
                    {
                        bookingId: booking._id.toString(),
                        stripePaymentIntentId: session.payment_intent,
                        status: "succeeded",
                        paymentMethod: session.payment_method_types[0],
                    }
                );


                break;

            case "payment_intent.payment_failed":
                const failedIntent = event.data.object;

                await updatePayment(
                    { stripePaymentIntentId: failedIntent.id },
                    { status: "failed" }
                );
                break;

            default:

        }

        return NextResponse.json({ received: true });
    } catch (error) {
        console.error("Webhook error:", error);
        return NextResponse.json(
            { error: "Webhook handler failed" },
            { status: 500 }
        );
    }
}
