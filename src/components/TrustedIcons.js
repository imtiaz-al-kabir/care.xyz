"use client";

import { motion } from "framer-motion";

const PARTNERS = [
    "HEALTH PARTNER",
    "TRUST CARE",
    "SAFE HOME",
    "MEDICLIFE",
    "FAMILY FIRST",
];

export default function TrustedIcons() {
    return (
        <div className="bg-slate-50 py-12 border-y border-slate-100 overflow-hidden relative">
            {/* Decorative gradient masks for smooth fade */}
            <div className="absolute inset-0 z-10 pointer-events-none select-none">
                <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-slate-50 to-transparent" />
                <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-slate-50 to-transparent" />
            </div>

            <div className="max-w-7xl mx-auto px-4">
                <div className="flex overflow-hidden">
                    <motion.div
                        className="flex gap-20 items-center whitespace-nowrap"
                        animate={{
                            x: [0, -1000],
                        }}
                        transition={{
                            x: {
                                repeat: Infinity,
                                repeatType: "loop",
                                duration: 20,
                                ease: "linear",
                            },
                        }}
                    >
                        {/* Triple the items to ensure the marquee fills the screen and loops perfectly */}
                        {[...PARTNERS, ...PARTNERS, ...PARTNERS].map((partner, index) => (
                            <span
                                key={index}
                                className="text-xl font-bold text-slate-400 font-heading tracking-widest opacity-50 hover:opacity-100 transition-opacity duration-300"
                            >
                                {partner}
                            </span>
                        ))}
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
