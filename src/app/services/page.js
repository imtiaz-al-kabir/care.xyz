"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { CheckCircle2, ArrowRight, Star, Clock, ShieldCheck, Heart, Loader2 } from "lucide-react";

export default function ServicesPage() {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await fetch("/api/services");
                const data = await response.json();
                setServices(data);
            } catch (error) {
                console.error("Failed to fetch services:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchServices();
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 30, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    };

    return (
        <div className="pt-44 pb-32 bg-white min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center max-w-3xl mx-auto mb-24"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-50 border border-teal-100 text-teal-700 font-bold text-sm mb-6">
                        Premium Selection
                    </div>
                    <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 font-heading tracking-tight">
                        Tailored Care Solutions
                    </h1>
                    <p className="text-xl text-slate-500 font-inter leading-relaxed">
                        We've curated a elite network of caregiving specialists to provide your family with the specialized attention and clinical excellence they deserve.
                    </p>
                </motion.div>

                {/* Grid */}
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <Loader2 className="w-12 h-12 text-teal-600 animate-spin mb-4" />
                        <p className="text-slate-500 font-medium">Loading our premium services...</p>
                    </div>
                ) : (
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
                    >
                        {services.map((service) => (
                            <motion.div
                                key={service.id}
                                variants={itemVariants}
                                className="group bg-white rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col overflow-hidden"
                            >
                                {/* Image Part */}
                                <div className="relative h-64 overflow-hidden">
                                    <img
                                        src={service.image}
                                        alt={service.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute top-4 left-4">
                                        <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
                                            <Star size={14} className="fill-yellow-400 text-yellow-400" />
                                            <span className="text-sm font-bold text-slate-900">4.9</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Content Part */}
                                <div className="p-10 flex-grow flex flex-col">
                                    <div className="flex justify-between items-start mb-6">
                                        <h2 className="text-2xl font-bold text-slate-900 font-heading group-hover:text-teal-600 transition-colors">
                                            {service.title}
                                        </h2>
                                        <div className="text-teal-600 font-bold text-xl">
                                            ${service.pricePerHour}<span className="text-slate-400 text-sm font-normal">/hr</span>
                                        </div>
                                    </div>

                                    <p className="text-slate-500 mb-8 flex-grow leading-relaxed flex items-start italic font-inter">
                                        "{service.shortDescription}"
                                    </p>

                                    <div className="space-y-4 mb-10">
                                        {service.features.slice(0, 4).map((feature, idx) => (
                                            <div key={idx} className="flex items-center text-slate-600 font-medium">
                                                <div className="w-6 h-6 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center mr-3 shrink-0">
                                                    <CheckCircle2 size={14} />
                                                </div>
                                                <span className="text-sm">{feature}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 mt-auto">
                                        <Link
                                            href={`/services/${service.id}`}
                                            className="flex items-center justify-center py-4 px-6 bg-slate-50 text-slate-900 font-bold rounded-2xl hover:bg-slate-100 transition-colors"
                                        >
                                            Details
                                        </Link>
                                        <Link
                                            href={`/booking/${service.id}`}
                                            className="flex items-center justify-center gap-2 py-4 px-6 bg-slate-900 text-white font-bold rounded-2xl shadow-lg shadow-slate-900/10 hover:shadow-slate-900/20 hover:-translate-y-0.5 transition-all"
                                        >
                                            Book <ArrowRight size={18} />
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                )}

                {/* Trust Signals */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    viewport={{ once: true }}
                    className="mt-24 pt-16 border-t border-slate-100 grid md:grid-cols-3 gap-12"
                >
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-teal-50 text-teal-600 rounded-2xl flex items-center justify-center shrink-0">
                            <ShieldCheck size={24} />
                        </div>
                        <div>
                            <div className="font-bold text-slate-900">Health Verified</div>
                            <div className="text-sm text-slate-500">Fully screened specialists</div>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center shrink-0">
                            <Clock size={24} />
                        </div>
                        <div>
                            <div className="font-bold text-slate-900">Instant Booking</div>
                            <div className="text-sm text-slate-500">Available 24/7/365</div>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center shrink-0">
                            <Heart size={24} />
                        </div>
                        <div>
                            <div className="font-bold text-slate-900">Family Favorite</div>
                            <div className="text-sm text-slate-500">Top rated in Bangladesh</div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
