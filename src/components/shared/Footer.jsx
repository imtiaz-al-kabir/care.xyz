"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, ArrowRight, Heart } from "lucide-react";

const Footer = () => {
    const pathname = usePathname();

    if (pathname?.startsWith("/admin")) {
        return null;
    }

    return (
        <footer className="bg-slate-900 pt-20 pb-10 overflow-hidden relative">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-teal-600/10 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
                    {/* Brand Section */}
                    <div className="space-y-6">
                        <Link href="/" className="flex items-center gap-2 group">
                            <div className="w-10 h-10 bg-teal-500 rounded-xl flex items-center justify-center shadow-lg shadow-teal-500/20 group-hover:scale-110 transition-transform">
                                <span className="text-white text-xl font-bold font-heading">C</span>
                            </div>
                            <span className="text-2xl font-bold font-heading tracking-tight text-white">
                                Care<span className="text-teal-400">.</span>xyz
                            </span>
                        </Link>
                        <p className="text-slate-400 leading-relaxed font-inter">
                            Empowering families with elite, trusted care services. We provide elite expertise for your most precious loved ones with compassion and tech-driven precision.
                        </p>
                        <div className="flex gap-4">
                            {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                                <Link
                                    key={i}
                                    href="#"
                                    className="w-10 h-10 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-slate-400 hover:bg-teal-500 hover:text-white hover:border-teal-500 transition-all"
                                >
                                    <Icon size={18} />
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Services Section */}
                    <div>
                        <h3 className="text-white font-bold font-heading text-lg mb-8 relative inline-block">
                            Services
                            <span className="absolute -bottom-2 left-0 w-8 h-1 bg-teal-500 rounded-full" />
                        </h3>
                        <ul className="space-y-4">
                            {[
                                { name: "Baby Care", href: "/services/baby-care" },
                                { name: "Elderly Care", href: "/services/elderly-care" },
                                { name: "Patient Care", href: "/services/sick-care" },
                                { name: "Medical Support", href: "/services#" },
                            ].map((item) => (
                                <li key={item.name}>
                                    <Link href={item.href} className="text-slate-400 hover:text-teal-400 flex items-center gap-2 transition-all group">
                                        <ArrowRight size={14} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Quick Links Section */}
                    <div>
                        <h3 className="text-white font-bold font-heading text-lg mb-8 relative inline-block">
                            Explore
                            <span className="absolute -bottom-2 left-0 w-8 h-1 bg-teal-500 rounded-full" />
                        </h3>
                        <ul className="space-y-4">
                            {[
                                { name: "About Our Story", href: "/about" },
                                { name: "Our Expert Team", href: "/contact" },
                                { name: "Privacy Policy", href: "/privacy" },
                                { name: "Terms of Use", href: "/terms" },
                            ].map((item) => (
                                <li key={item.name}>
                                    <Link href={item.href} className="text-slate-400 hover:text-teal-400 flex items-center gap-2 transition-all group">
                                        <ArrowRight size={14} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Section */}
                    <div>
                        <h3 className="text-white font-bold font-heading text-lg mb-8 relative inline-block">
                            Get in Touch
                            <span className="absolute -bottom-2 left-0 w-8 h-1 bg-teal-500 rounded-full" />
                        </h3>
                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-teal-400 border border-white/10">
                                    <Mail size={18} />
                                </div>
                                <div>
                                    <div className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">Email us</div>
                                    <a href="mailto:support@care.xyz" className="text-slate-300 hover:text-teal-400 transition-colors">support@care.xyz</a>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-teal-400 border border-white/10">
                                    <Phone size={18} />
                                </div>
                                <div>
                                    <div className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">Call Expert</div>
                                    <a href="tel:+8801234567890" className="text-slate-300 hover:text-teal-400 transition-colors">+880 1234 567890</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/5 mt-20 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="text-slate-500 text-sm font-inter">
                        &copy; {new Date().getFullYear()} <span className="text-slate-400 font-bold">Care.xyz</span>. Bangladesh's most trusted care network.
                    </div>
                    <div className="flex items-center gap-2 text-slate-500 text-sm">
                        Made with <Heart size={14} className="text-teal-500 fill-teal-500" /> by <span className="text-slate-400 font-bold hover:text-teal-400 transition-colors cursor-pointer">Antigravity Team</span>
                    </div>
                </div>
            </div>
        </footer >
    );
};

export default Footer;
