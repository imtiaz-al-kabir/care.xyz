import Link from "next/link";

export default function PaymentCancelPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
                <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </div>

                <h1 className="text-3xl font-bold text-gray-900 mb-4">Payment Cancelled</h1>
                <p className="text-gray-600 mb-8">
                    Your payment was cancelled. No charges have been made to your account.
                </p>

                <div className="space-y-3">
                    <Link
                        href="/services"
                        className="block w-full py-3 px-6 bg-teal-600 text-white font-bold rounded-xl hover:bg-teal-700 transition-colors"
                    >
                        Browse Services
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
