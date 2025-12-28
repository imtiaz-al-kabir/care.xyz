"use client";

import Link from "next/link";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Swal from "sweetalert2";

function PaymentSuccessContent() {
    const searchParams = useSearchParams();
    const sessionId = searchParams.get("session_id");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const verifyPayment = async () => {
            if (sessionId) {
                try {
                    const response = await fetch(`/api/stripe/verify-session?session_id=${sessionId}`);
                    const data = await response.json();
                    if (data.success) {

                        // Trigger invoice email
                        fetch("/api/send-invoice", {
                            method: "POST",
                            body: JSON.stringify({ bookingData: data.session.metadata.bookingData ? JSON.parse(data.session.metadata.bookingData) : {} }),
                            headers: { "Content-Type": "application/json" }
                        })
                            .then(() => {
                                Swal.fire({
                                    title: "Invoice Sent!",
                                    text: "A professional invoice has been sent to your email.",
                                    icon: "success",
                                    iconColor: "#0d9488",
                                    confirmButtonColor: "#0d9488",
                                    timer: 3000,
                                    timerProgressBar: true,
                                    background: "#ffffff",
                                    customClass: {
                                        popup: "rounded-[2rem]",
                                        confirmButton: "rounded-xl px-8 py-3 font-bold"
                                    }
                                });
                            })
                            .catch(e => console.error("Email trigger failed:", e));
                    }
                } catch (error) {
                    console.error("Verification failed:", error);
                } finally {
                    setLoading(false);
                }
            } else {
                setLoading(false);
            }
        };

        verifyPayment();
    }, [sessionId]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-teal-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Processing your payment...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                </div>

                <h1 className="text-3xl font-bold text-gray-900 mb-4">Payment Successful!</h1>
                <p className="text-gray-600 mb-8">
                    Your booking has been confirmed. You will receive a confirmation email shortly.
                </p>

                <div className="space-y-3">
                    <Link
                        href="/my-bookings"
                        className="block w-full py-3 px-6 bg-teal-600 text-white font-bold rounded-xl hover:bg-teal-700 transition-colors"
                    >
                        View My Bookings
                    </Link>
                    <Link
                        href="/"
                        className="block w-full py-3 px-6 bg-gray-100 text-gray-700 font-medium rounded-xl hover:bg-gray-200 transition-colors"
                    >
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default function PaymentSuccessPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-teal-600"></div>
            </div>
        }>
            <PaymentSuccessContent />
        </Suspense>
    );
}
