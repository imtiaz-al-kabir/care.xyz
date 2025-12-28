"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Heart, Users, Award, Target, BookOpen, Star, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
    const stats = [
        { label: "Families Served", value: "2,500+", icon: Heart, color: "text-rose-600", bg: "bg-rose-50" },
        { label: "Verified Experts", value: "450+", icon: ShieldCheck, color: "text-teal-600", bg: "bg-teal-50" },
        { label: "Cities Covered", value: "12+", icon: Target, color: "text-blue-600", bg: "bg-blue-50" },
        { label: "Average Rating", value: "4.9/5", icon: Star, color: "text-yellow-600", bg: "bg-yellow-50" },
    ];

    const values = [
        {
            title: "Compassion First",
            description: "We believe care is more than a service—it's a human connection built on empathy.",
            icon: Heart
        },
        {
            title: "Verified Excellence",
            description: "Every caregiver in our network undergo rigorous medical and background screening.",
            icon: ShieldCheck
        },
        {
            title: "Family Integrity",
            description: "We treat your family like our own, maintaining the highest standards of dignity.",
            icon: Users
        },
    ];

    return (
        <div className="pt-44 pb-32 bg-white min-h-screen overflow-hidden">
            {/* Hero Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative mb-32">
                <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-teal-500/5 blur-[120px] rounded-full" />

                <div className="grid lg:grid-cols-2 gap-20 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal-50 text-teal-700 rounded-full text-sm font-bold mb-6 border border-teal-100">
                            Our Story
                        </div>
                        <h1 className="text-5xl md:text-7xl font-bold text-slate-900 mb-8 leading-[1.1] font-heading tracking-tight">
                            Redefining the <span className="text-teal-600">Standard</span> of Care.
                        </h1>
                        <p className="text-xl text-slate-600 mb-10 leading-relaxed font-inter">
                            Care.xyz was born from a simple realization: quality care shouldn't be hard to find. We've built Bangladesh's most trusted network of specialists to ensure your loved ones receive the elite attention they deserve.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Link href="/services" className="px-8 py-4 bg-slate-900 text-white font-bold rounded-2xl shadow-xl shadow-slate-900/10 hover:shadow-slate-900/20 hover:-translate-y-0.5 transition-all flex items-center gap-2">
                                Explore Services <ArrowRight size={20} />
                            </Link>
                            <Link href="/contact" className="px-8 py-4 bg-white border border-slate-200 text-slate-900 font-bold rounded-2xl hover:bg-slate-50 transition-all">
                                Meet the Team
                            </Link>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative"
                    >
                        <div className="aspect-square rounded-[3rem] bg-slate-100 overflow-hidden shadow-2xl relative z-10 border-8 border-white">
                            <img
                                src="file:///C:/Users/imtia/.gemini/antigravity/brain/047017b1-f27d-4af0-9fa8-b04277ad8175/hero_caregiving_premium_1766915280039.png"
                                alt="Modern Caregiving"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-teal-500 rounded-[2rem] -z-10 animate-pulse opacity-20" />
                        <div className="absolute -top-10 -right-10 w-48 h-48 bg-blue-500 rounded-full -z-10 animate-blob filter blur-3xl opacity-20" />
                    </motion.div>
                </div>
            </div>

            {/* Stats Section */}
            <div className="bg-slate-50 py-24 mb-32">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className="text-center"
                            >
                                <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm`}>
                                    <stat.icon size={24} />
                                </div>
                                <div className="text-4xl font-bold text-slate-900 mb-1 font-heading">{stat.value}</div>
                                <div className="text-sm font-bold text-slate-500 uppercase tracking-widest">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Mission Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-32">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <h2 className="text-4xl font-bold text-slate-900 mb-6 font-heading">Guided by Radical Empathy</h2>
                    <p className="text-lg text-slate-500 font-inter">
                        Our values define every interaction we have. We're not just a platform; we're a community dedicated to the art of caregiving.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-10">
                    {values.map((value, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.2 }}
                            viewport={{ once: true }}
                            className="p-10 rounded-[2.5rem] border border-slate-100 bg-white hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group"
                        >
                            <div className="w-16 h-16 bg-slate-900 text-white rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-teal-600 transition-all duration-500">
                                <value.icon size={32} />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-4 font-heading">{value.title}</h3>
                            <p className="text-slate-500 leading-relaxed font-inter">
                                {value.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Team Section Placeholder / CTA */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="relative rounded-[4rem] bg-teal-600 p-12 md:p-24 overflow-hidden shadow-2xl text-center">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2" />
                    <div className="relative z-10">
                        <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 font-heading">Experience the Difference</h2>
                        <p className="text-xl text-white/80 max-w-2xl mx-auto mb-12 font-inter leading-relaxed">
                            Ready to give your family the best? Join thousands of satisfied households who trust Care.xyz for their most precious needs.
                        </p>
                        <Link href="/services" className="inline-flex items-center gap-3 px-10 py-5 bg-white text-teal-700 text-xl font-bold rounded-[2rem] hover:scale-105 transition-transform shadow-2xl">
                            Get Started Now <ArrowRight />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
