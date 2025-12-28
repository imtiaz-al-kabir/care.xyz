"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Home, ArrowRight, AlertCircle, Search } from "lucide-react";

export default function NotFound() {
    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4 relative overflow-hidden font-inter">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-full bg-slate-50/50 -z-10" />
            <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-teal-500/5 blur-[120px] rounded-full" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/5 blur-[120px] rounded-full" />

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="max-w-xl w-full text-center relative z-10"
            >
                <div className="relative mb-12">
                    <motion.h1
                        initial={{ y: 20 }}
                        animate={{ y: 0 }}
                        className="text-[12rem] font-bold text-slate-100 font-heading leading-none select-none"
                    >
                        404
                    </motion.h1>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="p-6 bg-white shadow-2xl rounded-[2.5rem] border border-slate-100 transform -rotate-6">
                            <AlertCircle size={64} className="text-teal-600" />
                        </div>
                    </div>
                </div>

                <h2 className="text-4xl md:text-5xl font-bold text-slate-900 font-heading mb-6 tracking-tight">
                    Lost in the Clinical Network?
                </h2>
                <p className="text-xl text-slate-500 font-inter mb-12 leading-relaxed">
                    The family care resource you're looking for seems to have been moved or doesn't exist. Let's get you back to the main portal.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                    <Link
                        href="/"
                        className="w-full sm:w-auto px-10 py-5 bg-slate-900 text-white font-bold rounded-2xl shadow-xl shadow-slate-900/10 hover:shadow-slate-900/20 hover:-translate-y-1 transition-all flex items-center justify-center gap-2"
                    >
                        <Home size={20} /> Back to Dashboard
                    </Link>
                    <Link
                        href="/services"
                        className="w-full sm:w-auto px-10 py-5 bg-white border border-slate-200 text-slate-900 font-bold rounded-2xl hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
                    >
                        <Search size={20} /> Browse Services <ArrowRight size={18} />
                    </Link>
                </div>

                <div className="mt-20 pt-10 border-t border-slate-100 flex items-center justify-center gap-8">
                    <div className="flex flex-col items-center">
                        <div className="text-xl font-bold text-slate-900">10k+</div>
                        <div className="text-xs text-slate-400 font-bold uppercase tracking-widest">Happy Families</div>
                    </div>
                    <div className="w-px h-8 bg-slate-100" />
                    <div className="flex flex-col items-center">
                        <div className="text-xl font-bold text-slate-900">4.9/5</div>
                        <div className="text-xs text-slate-400 font-bold uppercase tracking-widest">User Rating</div>
                    </div>
                    <div className="w-px h-8 bg-slate-100" />
                    <div className="flex flex-col items-center">
                        <div className="text-xl font-bold text-slate-900">24/7</div>
                        <div className="text-xs text-slate-400 font-bold uppercase tracking-widest">Clinical Support</div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
