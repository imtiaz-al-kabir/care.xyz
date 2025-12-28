import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createPayment } from "@/lib/collections/payments";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_placeholder");

export async function POST(request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json(
                { success: false, message: "Unauthorized" },
                { status: 401 }
            );
        }

        const bookingData = await request.json();

        // Create Stripe checkout session
        const checkoutSession = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: [
                {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: bookingData.serviceName,
                            description: `${bookingData.duration} ${bookingData.durationType} of ${bookingData.serviceName}`,
                        },
                        unit_amount: Math.round(bookingData.totalCost * 100), // Convert to cents
                    },
                    quantity: 1,
                },
            ],
            mode: "payment",
            customer_email: session.user.email,
            success_url: `${process.env.NEXTAUTH_URL}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.NEXTAUTH_URL}/payment/cancel`,
            metadata: {
                userId: session.user.id,
                bookingData: JSON.stringify(bookingData),
            },
        });

        // Create payment record
        await createPayment({
            userId: session.user.id,
            amount: bookingData.totalCost,
            stripeSessionId: checkoutSession.id,
            stripePaymentIntentId: checkoutSession.payment_intent || "pending",
            status: "pending",
            bookingData: bookingData,
        });

        return NextResponse.json({
            success: true,
            sessionId: checkoutSession.id,
            url: checkoutSession.url,
        });
    } catch (error) {
        console.error("Stripe checkout error:", error);
        return NextResponse.json(
            { success: false, message: "Failed to create checkout session" },
            { status: 500 }
        );
    }
}
