"use client";

import Link from "next/link";
import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import { ChevronRight, CheckCircle2, Star, Clock, ShieldCheck, Mail, Phone, ArrowRight, Heart } from "lucide-react";

export default function ServiceDetailClient({ service }) {
    if (!service) {
        return notFound();
    }

    return (
        <div className="pt-44 pb-32 bg-white min-h-screen font-inter">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Breadcrumb */}
                <motion.nav
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-2 mb-12 text-sm font-medium text-slate-500"
                >
                    <Link href="/" className="hover:text-teal-600 transition-colors">Home</Link>
                    <ChevronRight size={14} />
                    <Link href="/services" className="hover:text-teal-600 transition-colors">Services</Link>
                    <ChevronRight size={14} />
                    <span className="text-slate-900 font-bold">{service.title}</span>
                </motion.nav>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
                    {/* Left Column: Info */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal-50 text-teal-700 rounded-full text-sm font-bold mb-8 border border-teal-100">
                            <Star size={14} className="fill-teal-700" />
                            Premium Selection
                        </div>
                        <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-8 leading-[1.1] font-heading tracking-tight">
                            {service.title}
                        </h1>
                        <p className="text-xl text-slate-600 mb-12 leading-relaxed font-inter italic border-l-4 border-teal-500 pl-6">
                            {service.fullDescription}
                        </p>

                        <div className="space-y-12">
                            <section>
                                <h3 className="text-2xl font-bold text-slate-900 mb-6 font-heading flex items-center gap-3">
                                    <CheckCircle2 className="text-teal-600" /> Key Features & Benefits
                                </h3>
                                <div className="grid sm:grid-cols-2 gap-6">
                                    {service.features.map((feature, idx) => (
                                        <motion.div
                                            key={idx}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.1 * idx }}
                                            className="flex items-start gap-4 p-4 rounded-3xl bg-slate-50 border border-slate-100"
                                        >
                                            <div className="w-6 h-6 rounded-full bg-white text-teal-600 flex items-center justify-center shrink-0 shadow-sm">
                                                <CheckCircle2 size={14} />
                                            </div>
                                            <span className="text-slate-700 font-medium">{feature}</span>
                                        </motion.div>
                                    ))}
                                </div>
                            </section>

                            <section className="p-8 rounded-[2.5rem] bg-slate-900 text-white relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/10 blur-3xl rounded-full" />
                                <h3 className="text-xl font-bold mb-4 font-heading">Our Promise</h3>
                                <p className="text-slate-400 mb-6 font-inter">
                                    We guarantee a matching within 24 hours of your request. All specialists are health-screened and background-verified for your peace of mind.
                                </p>
                                <div className="flex flex-wrap gap-4">
                                    <div className="flex items-center gap-2 text-sm text-teal-400 font-bold">
                                        <ShieldCheck size={18} /> Verified Experts
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-blue-400 font-bold">
                                        <Clock size={18} /> 24/7 Support
                                    </div>
                                </div>
                            </section>
                        </div>
                    </motion.div>

                    {/* Right Column: Booking Card */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="lg:sticky lg:top-32"
                    >
                        <div className="bg-white rounded-[3rem] shadow-2xl p-2 border border-slate-100 relative group overflow-hidden">
                            <div className="aspect-[4/3] rounded-[2.5rem] overflow-hidden mb-6 relative">
                                <img src={service.image} alt={service.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
                                <div className="absolute bottom-6 left-6 flex items-center gap-3">
                                    <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
                                        <Star size={14} className="fill-yellow-400 text-yellow-400" />
                                        <span className="text-sm font-bold text-slate-900">4.9/5 Rating</span>
                                    </div>
                                </div>
                            </div>

                            <div className="p-8 pt-2 text-center">
                                <div className="flex justify-center items-end gap-1 mb-2">
                                    <span className="text-sm text-slate-500 font-medium mb-1">Starting from</span>
                                    <span className="text-5xl font-bold text-slate-900 font-heading">${service.pricePerHour}</span>
                                    <span className="text-slate-400 font-medium mb-1">/ hour</span>
                                </div>
                                <p className="text-slate-500 mb-8 font-inter">Transparent pricing. No hidden fees.</p>

                                <div className="space-y-4">
                                    <Link
                                        href={`/booking/${service.id}`}
                                        className="flex items-center justify-center gap-3 w-full py-5 px-8 bg-slate-900 text-white text-xl font-bold rounded-[2rem] shadow-xl shadow-slate-900/10 hover:shadow-slate-900/20 hover:-translate-y-1 transition-all"
                                    >
                                        Book Now <ArrowRight size={22} />
                                    </Link>

                                    <div className="grid grid-cols-2 gap-4">
                                        <a href="tel:+8801234567890" className="flex items-center justify-center gap-2 py-4 px-4 bg-slate-50 text-slate-600 font-bold rounded-2xl hover:bg-slate-100 transition-colors">
                                            <Phone size={18} /> Call Us
                                        </a>
                                        <button className="flex items-center justify-center gap-2 py-4 px-4 bg-slate-50 text-slate-600 font-bold rounded-2xl hover:bg-slate-100 transition-colors">
                                            <Mail size={18} /> Email
                                        </button>
                                    </div>
                                </div>

                                <div className="mt-8 pt-8 border-t border-slate-50 flex items-center justify-center gap-4 text-slate-400 text-sm italic">
                                    <Heart size={14} className="text-rose-500 fill-rose-500" /> Trusted by 500+ locals for {service.title}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
