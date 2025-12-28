"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { servicesData } from "@/lib/data";
import { locationData } from "@/lib/locationData";
import {
    Calendar,
    Clock,
    MapPin,
    ArrowRight,
    ChevronLeft,
    ShieldCheck,
    Star,
    CreditCard,
    AlertCircle
} from "lucide-react";

export default function BookingPage({ params }) {
    const { id } = use(params);
    const router = useRouter();
    const { data: session, status } = useSession();
    const service = servicesData.find((s) => s.id === id);

    const [formData, setFormData] = useState({
        duration: 1,
        durationType: "hours",
        division: "",
        district: "",
        address: "",
        date: "",
    });

    const [cost, setCost] = useState(0);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        if (service) {
            let multiplier = formData.duration;
            if (formData.durationType === "days") {
                multiplier = formData.duration * 24;
            }
            setCost(multiplier * service.pricePerHour);
        }
    }, [formData.duration, formData.durationType, service]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (status !== "authenticated") {
            router.push("/login?callbackUrl=/booking/" + id);
            return;
        }

        setSubmitting(true);
        const booking = {
            serviceId: id,
            serviceName: service.title,
            ...formData,
            totalCost: cost,
            status: "Pending",
        };

        try {
            const response = await fetch("/api/stripe/checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(booking),
            });

            const data = await response.json();

            if (data.success && data.url) {
                window.location.href = data.url;
            } else {
                alert("Failed to initiate payment. Please try again.");
                setSubmitting(false);
            }
        } catch (error) {
            console.error("Failed to create checkout session:", error);
            alert("An error occurred. Please try again.");
            setSubmitting(false);
        }
    };

    if (status === "loading") {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="w-12 h-12 border-4 border-teal-500/20 border-t-teal-500 rounded-full animate-spin" />
            </div>
        );
    }

    if (!service) {
        return (
            <div className="pt-44 pb-32 text-center h-screen px-4">
                <div className="max-w-md mx-auto p-12 bg-slate-50 rounded-[3rem] border border-slate-100">
                    <AlertCircle size={48} className="text-slate-300 mx-auto mb-6" />
                    <h1 className="text-3xl font-bold font-heading mb-4">Service Not Found</h1>
                    <Link href="/services" className="inline-flex items-center gap-2 font-bold text-teal-600 hover:text-teal-700">
                        <ChevronLeft size={18} /> Browse All Services
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="pt-44 pb-32 bg-white min-h-screen font-inter">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Back Link */}
                <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="mb-12"
                >
                    <Link
                        href={`/services/${id}`}
                        className="inline-flex items-center gap-2 text-slate-500 hover:text-teal-600 font-bold transition-colors group"
                    >
                        <div className="w-10 h-10 rounded-full border border-slate-100 flex items-center justify-center group-hover:bg-teal-50 group-hover:border-teal-100 transition-colors">
                            <ChevronLeft size={18} />
                        </div>
                        Back to Service Details
                    </Link>
                </motion.div>

                <div className="grid lg:grid-cols-5 gap-16 items-start">
                    {/* Form Side */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="lg:col-span-3 space-y-8"
                    >
                        <div className="mb-12">
                            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 font-heading tracking-tight mb-4">
                                Schedule Your Care
                            </h1>
                            <p className="text-xl text-slate-500 leading-relaxed font-inter">
                                Provide your requirements below to match with a verified {service.title} specialist.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-12">
                            {/* Schedule & Duration */}
                            <section>
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="w-10 h-10 bg-teal-50 text-teal-600 rounded-xl flex items-center justify-center font-bold">1</div>
                                    <h2 className="text-2xl font-bold text-slate-900 font-heading">Schedule & Duration</h2>
                                </div>

                                <div className="grid sm:grid-cols-2 gap-8">
                                    <div className="space-y-3">
                                        <label className="text-sm font-bold text-slate-500 uppercase tracking-wider block ml-1">Preferred Date</label>
                                        <div className="relative group">
                                            <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-teal-600 transition-colors outline-none" size={18} />
                                            <input
                                                type="date"
                                                name="date"
                                                required
                                                min={new Date().toISOString().split('T')[0]}
                                                className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-slate-900 font-medium focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 outline-none transition-all"
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <label className="text-sm font-bold text-slate-500 uppercase tracking-wider block ml-1">Service Duration</label>
                                        <div className="flex gap-4">
                                            <input
                                                type="number"
                                                name="duration"
                                                min="1"
                                                value={formData.duration}
                                                onChange={handleChange}
                                                className="w-24 px-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-slate-900 font-bold text-center focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 outline-none transition-all"
                                            />
                                            <select
                                                name="durationType"
                                                value={formData.durationType}
                                                onChange={handleChange}
                                                className="flex-grow px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-slate-900 font-bold focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 outline-none transition-all appearance-none cursor-pointer"
                                            >
                                                <option value="hours">Hours</option>
                                                <option value="days">Days</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* Location Details */}
                            <section>
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="w-10 h-10 bg-teal-50 text-teal-600 rounded-xl flex items-center justify-center font-bold">2</div>
                                    <h2 className="text-2xl font-bold text-slate-900 font-heading">Location Details</h2>
                                </div>

                                <div className="space-y-8">
                                    <div className="grid sm:grid-cols-2 gap-8">
                                        <div className="space-y-3">
                                            <label className="text-sm font-bold text-slate-500 uppercase tracking-wider block ml-1">Division</label>
                                            <select
                                                name="division"
                                                required
                                                className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-slate-900 font-bold focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 outline-none transition-all"
                                                onChange={handleChange}
                                            >
                                                <option value="">Select Division</option>
                                                {locationData.divisions.map((d) => (
                                                    <option key={d.id} value={d.id}>{d.name}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-sm font-bold text-slate-500 uppercase tracking-wider block ml-1">District</label>
                                            <select
                                                name="district"
                                                required
                                                disabled={!formData.division}
                                                className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-slate-900 font-bold focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 outline-none transition-all disabled:opacity-50"
                                                onChange={handleChange}
                                            >
                                                <option value="">Select District</option>
                                                {formData.division && locationData.districts[formData.division]?.map((d) => (
                                                    <option key={d} value={d}>{d}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <label className="text-sm font-bold text-slate-500 uppercase tracking-wider block ml-1">Detailed Address</label>
                                        <div className="relative group">
                                            <MapPin className="absolute left-4 top-5 text-slate-400 group-focus-within:text-teal-600 transition-colors" size={18} />
                                            <textarea
                                                name="address"
                                                required
                                                rows="3"
                                                placeholder="Enter your street address, building number, and apartment info..."
                                                className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-slate-900 font-medium focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 outline-none transition-all resize-none"
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* Guard/Auth Note */}
                            {status === "unauthenticated" && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="p-6 bg-rose-50 border border-rose-100 rounded-3xl flex items-start gap-4"
                                >
                                    <AlertCircle className="text-rose-500 shrink-0 mt-1" size={20} />
                                    <div>
                                        <p className="text-rose-900 font-bold mb-1">Authenticated Booking Only</p>
                                        <p className="text-sm text-rose-700">You need to be logged in to access our secure Stripe checkout. We'll redirect you to login when you confirm.</p>
                                    </div>
                                </motion.div>
                            )}

                            <button
                                type="submit"
                                disabled={submitting}
                                className="w-full flex items-center justify-center gap-3 py-6 px-8 bg-slate-900 text-white text-xl font-bold rounded-[2.5rem] shadow-2xl shadow-slate-900/20 hover:bg-slate-800 hover:-translate-y-1 transition-all disabled:opacity-70 disabled:translate-y-0"
                            >
                                {submitting ? (
                                    <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <>
                                        {status === "unauthenticated" ? "Login to Book" : "Confirm & Pay"} <ArrowRight size={22} />
                                    </>
                                )}
                            </button>
                        </form>
                    </motion.div>

                    {/* Summary Side */}
                    <div className="lg:col-span-2 lg:sticky lg:top-44">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 }}
                            className="bg-slate-900 rounded-[3rem] p-10 text-white relative overflow-hidden shadow-2xl"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/10 blur-3xl rounded-full" />

                            <h3 className="text-xl font-bold font-heading mb-8 flex items-center gap-2">
                                <CreditCard className="text-teal-400" /> Payment Summary
                            </h3>

                            <div className="space-y-6">
                                <div className="flex justify-between items-center text-slate-400">
                                    <span className="text-sm font-medium">Service</span>
                                    <span className="text-sm font-bold text-white">{service.title}</span>
                                </div>
                                <div className="flex justify-between items-center text-slate-400">
                                    <span className="text-sm font-medium">Rate</span>
                                    <span className="text-sm font-bold text-white">${service.pricePerHour}/hr</span>
                                </div>
                                <div className="flex justify-between items-center text-slate-400">
                                    <span className="text-sm font-medium">Duration</span>
                                    <span className="text-sm font-bold text-white">{formData.duration} {formData.durationType}</span>
                                </div>

                                <div className="pt-6 border-t border-white/10">
                                    <div className="flex justify-between items-end mb-2">
                                        <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Total Investment</span>
                                        <span className="text-4xl font-bold text-teal-400 font-heading">${cost.toFixed(2)}</span>
                                    </div>
                                    <p className="text-[10px] text-slate-500 italic text-right">Includes all taxes and verification fees</p>
                                </div>
                            </div>

                            <div className="mt-10 space-y-4">
                                <div className="flex items-center gap-3 p-4 bg-white/5 rounded-2xl border border-white/10">
                                    <ShieldCheck size={20} className="text-teal-400" />
                                    <span className="text-xs font-bold opacity-80 uppercase tracking-widest">Stripe Secure Checkout</span>
                                </div>
                                <div className="flex items-center gap-3 p-4 bg-white/5 rounded-2xl border border-white/10">
                                    <Star size={20} className="text-yellow-400" />
                                    <span className="text-xs font-bold opacity-80 uppercase tracking-widest">Premium Care Guarantee</span>
                                </div>
                            </div>
                        </motion.div>

                        <div className="mt-8 px-8 text-center">
                            <p className="text-slate-400 text-sm leading-relaxed">
                                By proceeding, you agree to our <Link href="/terms" className="text-teal-600 font-bold underline">Terms of Service</Link> regarding caregiver coordination and health privacy.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
