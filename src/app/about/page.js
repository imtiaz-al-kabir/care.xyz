"use client";

import { motion } from "framer-motion";
import { Heart, Shield, Users, Target, Award, Star } from "lucide-react";
import Image from "next/image";

export default function AboutPage() {
    const stats = [
        { label: "Families Served", value: "10k+", icon: HomeIcon },
        { label: "Care Experts", value: "500+", icon: Users },
        { label: "City Presence", value: "15+", icon: MapPinIcon },
        { label: "Client Satisfaction", value: "98%", icon: Star },
    ];

    const values = [
        {
            title: "Unwavering Compassion",
            desc: "We believe care goes beyond tasks; it's about building meaningful connections and providing emotional support.",
            icon: Heart,
            color: "text-rose-500",
            bg: "bg-rose-50",
        },
        {
            title: "Rigorous Safety",
            desc: "Your trust is our priority. Every caregiver undergoes biometric verification and multi-stage background checks.",
            icon: Shield,
            color: "text-teal-600",
            bg: "bg-teal-50",
        },
        {
            title: "Expertise First",
            desc: "Our team consists of certified professionals trained in specialized elderly, child, and post-operative care.",
            icon: Award,
            color: "text-blue-600",
            bg: "bg-blue-50",
        },
    ];

    return (
        <div className="bg-white min-h-screen pt-24">
            {/* Hero Section */}
            <section className="relative py-24 overflow-hidden">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-slate-50/50 -z-10" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <h2 className="text-teal-600 font-bold tracking-widest uppercase text-sm mb-4">Our Journey</h2>
                            <h1 className="text-5xl md:text-7xl font-bold font-heading text-slate-900 leading-[1.1] mb-8">
                                Redefining Care for the <span className="text-transparent bg-clip-text bg-linear-to-r from-teal-600 to-blue-600">Modern Family</span>
                            </h1>
                            <p className="text-xl text-slate-600 leading-relaxed mb-10">
                                Founded in 2020, Care.xyz started with a simple belief: that everyone deserves access to high-quality, professional, and compassionate home care. We bridge the gap between families in need and verified care experts.
                            </p>
                            <div className="flex gap-4">
                                <div className="flex -space-x-3">
                                    {[1, 2, 3, 4].map((i) => (
                                        <div key={i} className="w-12 h-12 rounded-full border-2 border-white bg-slate-200 overflow-hidden">
                                            <Image
                                                src={`https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100&auto=format&fit=crop`}
                                                width={100}
                                                height={100}
                                                alt="User"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    ))}
                                </div>
                                <div className="text-sm">
                                    <div className="font-bold text-slate-900">Joined by 10k+ families</div>
                                    <div className="text-slate-500">across 15+ cities</div>
                                </div>
                            </div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8 }}
                            className="relative"
                        >
                            <div className="aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl relative z-10">
                                <Image
                                    src="https://images.unsplash.com/photo-1516733725897-1aa73b87c8e8?q=80&w=1170&auto=format&fit=crop"
                                    width={1200}
                                    height={1500}
                                    alt="Caregivers laughing"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-teal-500 rounded-full blur-[80px] opacity-20" />
                            <div className="absolute -top-8 -right-8 w-40 h-40 bg-blue-500 rounded-full blur-[80px] opacity-20" />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Mission Section */}
            <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-3xl mx-auto"
                    >
                        <Target className="w-16 h-16 text-teal-400 mx-auto mb-8" />
                        <h2 className="text-4xl md:text-5xl font-bold font-heading mb-8">Our Mission</h2>
                        <p className="text-2xl text-slate-400 leading-relaxed italic font-inter font-light">
                            "To empower families by providing a seamless, secure, and compassionate platform that connects them with world-class care providers, ensuring dignity and peace of mind for every stage of life."
                        </p>
                    </motion.div>
                </div>
                <div className="absolute top-0 right-0 w-1/2 h-full bg-teal-600/5 blur-[120px]" />
            </section>

            {/* Values Section */}
            <section className="py-32">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-20">
                        <h2 className="text-teal-600 font-bold tracking-widest uppercase text-sm mb-4">Our Values</h2>
                        <h3 className="text-4xl md:text-5xl font-bold font-heading text-slate-900">What Drives Us Every Day</h3>
                    </div>
                    <div className="grid md:grid-cols-3 gap-12">
                        {values.map((val, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className="group p-10 rounded-[2.5rem] bg-white border border-slate-100 shadow-xl shadow-slate-200/20 hover:shadow-2xl hover:shadow-slate-200/50 hover:-translate-y-2 transition-all duration-500"
                            >
                                <div className={`w-16 h-16 ${val.bg} ${val.color} rounded-2xl flex items-center justify-center mb-8 shadow-sm group-hover:scale-110 transition-transform duration-500`}>
                                    <val.icon size={32} />
                                </div>
                                <h4 className="text-2xl font-bold text-slate-900 mb-4 font-heading">{val.title}</h4>
                                <p className="text-slate-600 leading-relaxed font-inter">{val.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section Placeholder */}
            <section className="py-32 bg-slate-50">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-4xl font-bold font-heading text-slate-900 mb-8">Want to learn more about our recruitment process?</h2>
                    <p className="text-lg text-slate-600 mb-12">We take safety seriously. Our caregivers go through a 5-step verification process before they ever step into a home.</p>
                    <button className="px-10 py-4 bg-slate-900 text-white rounded-full font-bold shadow-xl hover:bg-slate-800 transition-all">
                        View Safety Standards
                    </button>
                </div>
            </section>
        </div>
    );
}

function HomeIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
    );
}

function MapPinIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
            <circle cx="12" cy="10" r="3" />
        </svg>
    );
}
