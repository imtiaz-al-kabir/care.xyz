"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, MessageCircle, Clock, ExternalLink } from "lucide-react";
import { useState } from "react";

export default function ContactPage() {
    const [formStatus, setFormStatus] = useState("idle");

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormStatus("submitting");
        setTimeout(() => setFormStatus("success"), 1500);
    };

    const contactInfo = [
        {
            title: "Direct Support",
            detail: "+880 1234-567890",
            icon: Phone,
            color: "text-teal-600",
            bg: "bg-teal-50",
            desc: "24/7 priority line for urgent needs.",
        },
        {
            title: "Email Inquiry",
            detail: "hello@care.xyz",
            icon: Mail,
            color: "text-blue-600",
            bg: "bg-blue-50",
            desc: "Get a response within 4 hours.",
        },
        {
            title: "Headquarters",
            detail: "Gulshan 1, Dhaka, Bangladesh",
            icon: MapPin,
            color: "text-rose-500",
            bg: "bg-rose-50",
            desc: "Our central hub of operation.",
        },
    ];

    return (
        <div className="bg-white min-h-screen pt-24">
            {/* Hero Section */}
            <section className="relative py-20 bg-slate-900 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-teal-900/20 to-blue-900/20" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-5xl md:text-6xl font-bold font-heading text-white mb-6">
                            Let's Talk About <span className="text-teal-400">Care</span>
                        </h1>
                        <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
                            Whether you're looking for support for a loved one or have questions about our services, our team is here for you.
                        </p>
                    </motion.div>
                </div>
                {/* Background Blobs */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 blur-[100px] rounded-full" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 blur-[100px] rounded-full" />
            </section>

            <section className="py-24 -mt-16 relative z-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Contact Info Cards */}
                        <div className="lg:col-span-1 space-y-6">
                            {contactInfo.map((info, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="p-8 bg-white border border-slate-100 rounded-[2.5rem] shadow-xl shadow-slate-200/20"
                                >
                                    <div className={`w-14 h-14 ${info.bg} ${info.color} rounded-2xl flex items-center justify-center mb-6`}>
                                        <info.icon size={28} />
                                    </div>
                                    <h4 className="text-xl font-bold text-slate-900 mb-2 font-heading">{info.title}</h4>
                                    <div className="text-lg font-bold text-slate-900 mb-2">{info.detail}</div>
                                    <p className="text-slate-500 text-sm leading-relaxed">{info.desc}</p>
                                </motion.div>
                            ))}

                            <div className="p-8 bg-linear-to-br from-teal-600 to-blue-700 rounded-[2.5rem] text-white shadow-xl">
                                <MessageCircle className="w-10 h-10 mb-6 text-white/50" />
                                <h4 className="text-xl font-bold mb-4 font-heading">Real-time Assistance</h4>
                                <p className="text-white/80 mb-6 text-sm">Need help booking? Chat with an expert right now on WhatsApp.</p>
                                <button className="w-full py-4 bg-white/10 hover:bg-white/20 border border-white/20 rounded-2xl font-bold transition-all flex items-center justify-center gap-2">
                                    Start Chat <ExternalLink size={18} />
                                </button>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="lg:col-span-2">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="h-full bg-white border border-slate-100 rounded-[3rem] shadow-2xl shadow-slate-200/50 p-10 md:p-14"
                            >
                                <div className="mb-10">
                                    <h3 className="text-3xl font-bold text-slate-900 mb-2 font-heading">Send a Message</h3>
                                    <p className="text-slate-500">We'll get back to you faster than you think.</p>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-8">
                                    <div className="grid md:grid-cols-2 gap-8">
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-slate-700 ml-1">Your Full Name</label>
                                            <input
                                                required
                                                type="text"
                                                className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 outline-none transition-all"
                                                placeholder="John Doe"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-slate-700 ml-1">Email Address</label>
                                            <input
                                                required
                                                type="email"
                                                className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 outline-none transition-all"
                                                placeholder="john@example.com"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700 ml-1">Subject</label>
                                        <select className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 outline-none transition-all appearance-none">
                                            <option>General Inquiry</option>
                                            <option>Booking Problem</option>
                                            <option>Service Feedback</option>
                                            <option>Partner Opportunities</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700 ml-1">Your Message</label>
                                        <textarea
                                            required
                                            rows={6}
                                            className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 outline-none transition-all resize-none"
                                            placeholder="Tell us how we can help you..."
                                        />
                                    </div>

                                    <button
                                        disabled={formStatus === "submitting"}
                                        className="w-full md:w-auto px-12 py-5 bg-slate-900 text-white rounded-full font-bold text-lg shadow-2xl shadow-slate-900/20 hover:bg-slate-800 hover:-translate-y-1 active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-70 disabled:translate-y-0"
                                    >
                                        {formStatus === "submitting" ? (
                                            <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        ) : formStatus === "success" ? (
                                            "Message Sent!"
                                        ) : (
                                            <>Send Message <Send size={20} /></>
                                        )}
                                    </button>
                                </form>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Map Placeholder */}
            <section className="py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="rounded-[3rem] overflow-hidden grayscale opacity-80 h-[500px] relative border border-slate-200">
                        {/* This would be an iframe for Google Maps in production */}
                        <div className="absolute inset-0 bg-slate-100 flex items-center justify-center">
                            <div className="text-center">
                                <div className="p-5 bg-white rounded-full shadow-lg inline-block mb-4">
                                    <MapPin size={40} className="text-teal-600" />
                                </div>
                                <h3 className="text-2xl font-bold text-slate-900 font-heading">Our Dhaka Office</h3>
                                <p className="text-slate-500">Gulshan District Tower, Level 4</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
