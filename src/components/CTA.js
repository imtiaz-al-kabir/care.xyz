"use client";

import { Phone } from "lucide-react";
import Link from "next/link";

export default function CTA() {
    return (
        <section className="py-32 bg-white">
            <div className="max-w-5xl mx-auto px-4">
                <div className="bg-linear-to-br from-teal-600 to-blue-700 rounded-[3rem] p-12 md:p-20 text-center text-white relative overflow-hidden shadow-2xl">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />

                    <h2 className="text-4xl md:text-5xl font-bold mb-8 font-heading">
                        Ready to find the perfect care for your family?
                    </h2>
                    <p className="text-xl opacity-90 mb-12 max-w-2xl mx-auto">
                        Join thousands of happy families who trust Care.xyz for their home
                        care needs. Schedule your first session in less than 5 minutes.
                    </p>
                    <div className="flex flex-wrap justify-center gap-6">
                        <Link
                            href="/services"
                            className="px-10 py-5 bg-white text-slate-900 rounded-full font-bold text-xl shadow-xl hover:bg-slate-50 hover:-translate-y-1 transition-all"
                        >
                            Get Started Now
                        </Link>
                        <Link
                            href="/services"
                            className="px-10 py-5 bg-teal-500 text-white rounded-full font-bold text-xl border border-teal-400 shadow-xl hover:bg-teal-400 transition-all flex items-center gap-2"
                        >
                            <Phone size={22} /> Talk to an Expert
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
