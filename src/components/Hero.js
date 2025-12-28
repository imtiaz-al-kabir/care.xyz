"use client";

import { motion } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
    return (
        <section className="relative min-h-[90vh] flex items-center bg-white pt-40 pb-20">
            <div className="absolute top-0 right-0 w-1/3 h-full bg-slate-50 z-0 hidden lg:block" />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ x: -100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="text-left"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-50 border border-teal-100 text-teal-700 font-bold text-sm mb-6">
                            <span className="flex h-2 w-2 rounded-full bg-teal-500 animate-pulse"></span>
                            Trusted by 10,000+ Happy Families
                        </div>
                        <h1 className="text-6xl md:text-7xl font-bold tracking-tight text-slate-900 leading-[1.1] mb-6 font-heading">
                            Professional Care <br />
                            <span className="text-transparent bg-clip-text bg-linear-to-r from-teal-600 to-blue-600">
                                For Your Loved Ones
                            </span>
                        </h1>
                        <p className="max-w-xl text-xl text-slate-600 mb-10 leading-relaxed font-inter">
                            Experience premium home caregiving services tailored to your
                            family's needs. Safe, reliable, and verified experts just a
                            click away.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Link
                                href="/services"
                                className="px-10 py-4 bg-slate-900 text-white rounded-full font-bold text-lg shadow-2xl shadow-slate-900/20 hover:bg-slate-800 hover:-translate-y-1 transition-all flex items-center gap-2"
                            >
                                Book a Service <ArrowRight size={20} />
                            </Link>
                            <Link
                                href="/services"
                                className="px-10 py-4 bg-white text-slate-900 border border-slate-200 rounded-full font-bold text-lg hover:bg-slate-50 transition-all"
                            >
                                View Pricing
                            </Link>
                        </div>

                        <div className="mt-12 flex items-center gap-8 pt-8 border-t border-slate-100">
                            <div>
                                <div className="text-2xl font-bold text-slate-900">4.9/5</div>
                                <div className="text-sm text-slate-500 flex gap-1 items-center">
                                    {[1, 2, 3, 4, 5].map((i) => (
                                        <Star
                                            key={i}
                                            size={12}
                                            className="fill-yellow-400 text-yellow-400"
                                        />
                                    ))}
                                    User Rating
                                </div>
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-slate-900">100%</div>
                                <div className="text-sm text-slate-500">Verified Experts</div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="relative"
                    >
                        <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-700">
                            <Image
                                width={1200}
                                height={1500}
                                src="https://images.unsplash.com/photo-1761891954433-4d9664446d27?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                alt="Caregiving"
                                className="w-full h-full object-cover scale-110 hover:scale-100 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                            <div className="absolute bottom-8 left-8 right-8 bg-white/10 backdrop-blur-xl p-6 rounded-2xl border border-white/20">
                                <div className="flex items-center gap-4 text-white">
                                    <div className="w-12 h-12 bg-teal-500 rounded-full flex items-center justify-center font-bold text-xl">
                                        98%
                                    </div>
                                    <div>
                                        <div className="font-bold">Customer Satisfaction</div>
                                        <div className="text-sm opacity-80">
                                            Based on 2.4k reviews
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Decorative elements */}
                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-teal-500/10 rounded-full blur-3xl -z-1" />
                        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl -z-1" />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
