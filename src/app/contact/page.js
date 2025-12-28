"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, MessageCircle, Clock, ShieldCheck, ArrowRight } from "lucide-react";
import { useState } from "react";

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSent, setIsSent] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        setIsSubmitting(false);
        setIsSent(true);
        setFormData({ name: "", email: "", subject: "", message: "" });

        setTimeout(() => setIsSent(false), 5000);
    };

    const contactInfo = [
        {
            label: "Email Support",
            value: "support@care.xyz",
            detail: "24/7 Response Time",
            icon: Mail,
            color: "text-blue-600",
            bg: "bg-blue-50"
        },
        {
            label: "Phone Hotline",
            value: "+880 1234 567890",
            detail: "9 AM - 8 PM Daily",
            icon: Phone,
            color: "text-teal-600",
            bg: "bg-teal-50"
        },
        {
            label: "Global HQ",
            value: "Gulshan, Dhaka",
            detail: "Bangladesh Care Center",
            icon: MapPin,
            color: "text-rose-600",
            bg: "bg-rose-50"
        }
    ];

    return (
        <div className="pt-44 pb-32 bg-white min-h-screen overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                {/* Background Blur */}
                <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-teal-500/5 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 left-0 w-[40%] h-[40%] bg-blue-500/5 blur-[120px] rounded-full -translate-x-1/2 translate-y-1/2" />

                <div className="grid lg:grid-cols-2 gap-24 items-start relative z-10">
                    {/* Left Side: Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-full text-sm font-bold mb-8 shadow-xl">
                            <MessageCircle size={16} /> Contact Specialist
                        </div>
                        <h1 className="text-5xl md:text-7xl font-bold text-slate-900 mb-8 leading-[1.1] font-heading tracking-tight">
                            Get Expert <span className="text-teal-600">Assistance</span> Today.
                        </h1>
                        <p className="text-xl text-slate-500 mb-12 leading-relaxed font-inter">
                            Have questions about our care services? Our dedicated experts are ready to guide you through finding the perfect specialized attention for your family.
                        </p>

                        <div className="space-y-8">
                            {contactInfo.map((info, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 + i * 0.1 }}
                                    className="flex items-center gap-6 p-6 rounded-3xl border border-slate-100 bg-white hover:shadow-xl hover:scale-[1.02] transition-all"
                                >
                                    <div className={`w-14 h-14 ${info.bg} ${info.color} rounded-2xl flex items-center justify-center shrink-0`}>
                                        <info.icon size={28} />
                                    </div>
                                    <div>
                                        <div className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">{info.label}</div>
                                        <div className="text-xl font-bold text-slate-900 mb-1">{info.value}</div>
                                        <div className="text-sm text-slate-500 font-medium">{info.detail}</div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right Side: Form */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="bg-white p-10 md:p-14 rounded-[3.5rem] border border-slate-100 shadow-2xl relative"
                    >
                        {isSent ? (
                            <div className="text-center py-20">
                                <div className="w-20 h-20 bg-teal-50 text-teal-600 rounded-3xl flex items-center justify-center mx-auto mb-8 animate-bounce">
                                    <ShieldCheck size={40} />
                                </div>
                                <h2 className="text-3xl font-bold text-slate-900 mb-4 font-heading">Message Received!</h2>
                                <p className="text-slate-500 font-inter mb-8">Our care specialists will contact you within 2-4 business hours.</p>
                                <button
                                    onClick={() => setIsSent(false)}
                                    className="px-8 py-4 bg-slate-900 text-white font-bold rounded-2xl hover:scale-105 transition-all"
                                >
                                    Send Another
                                </button>
                            </div>
                        ) : (
                            <>
                                <h2 className="text-3xl font-bold text-slate-900 mb-8 font-heading">Direct Inquiry</h2>
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-slate-700 ml-1">Full Name</label>
                                            <input
                                                required
                                                type="text"
                                                className="w-full px-6 py-4 bg-slate-50 border border-slate-100 text-slate-900 text-sm rounded-2xl focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 outline-none transition-all"
                                                placeholder="John Doe"
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-slate-700 ml-1">Email Address</label>
                                            <input
                                                required
                                                type="email"
                                                className="w-full px-6 py-4 bg-slate-50 border border-slate-100 text-slate-900 text-sm rounded-2xl focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 outline-none transition-all"
                                                placeholder="john@example.com"
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700 ml-1">Subject</label>
                                        <input
                                            required
                                            type="text"
                                            className="w-full px-6 py-4 bg-slate-50 border border-slate-100 text-slate-900 text-sm rounded-2xl focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 outline-none transition-all"
                                            placeholder="Booking Inquiry"
                                            value={formData.subject}
                                            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700 ml-1">Your Message</label>
                                        <textarea
                                            required
                                            rows={5}
                                            className="w-full px-6 py-4 bg-slate-50 border border-slate-100 text-slate-900 text-sm rounded-3xl focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 outline-none transition-all resize-none"
                                            placeholder="Tell us how we can help..."
                                            value={formData.message}
                                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        />
                                    </div>

                                    <button
                                        disabled={isSubmitting}
                                        type="submit"
                                        className="w-full py-5 px-8 bg-slate-900 text-white font-bold rounded-[2rem] shadow-2xl hover:shadow-slate-900/40 hover:-translate-y-1 transition-all flex items-center justify-center gap-3 disabled:opacity-70"
                                    >
                                        {isSubmitting ? (
                                            <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        ) : (
                                            <>Send Premium Request <Send size={18} /></>
                                        )}
                                    </button>
                                </form>
                            </>
                        )}
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
