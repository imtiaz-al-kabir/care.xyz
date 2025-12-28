"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { User, Mail, Phone, Fingerprint, Lock, ArrowRight, ShieldCheck, Chrome } from "lucide-react";

export default function RegisterPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        contact: "",
        nid: "",
        password: "",
    });
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validatePassword = (password) => {
        const minLength = 6;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        return password.length >= minLength && hasUpperCase && hasLowerCase;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        if (!validatePassword(formData.password)) {
            setError("Password must be 6+ chars, with 1 upper & 1 lower letter.");
            setIsLoading(false);
            return;
        }

        try {
            const response = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (data.success) {
                router.push("/login?registered=true");
            } else {
                setError(data.message || "Registration failed. Please try again.");
                setIsLoading(false);
            }
        } catch (error) {
            console.error("Registration error:", error);
            setError("A network error occurred. Please try again.");
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-white relative overflow-hidden pt-44 pb-32">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-full bg-slate-50/50" />
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/5 blur-[120px] rounded-full" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-teal-500/5 blur-[120px] rounded-full" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-xl w-full mx-4 relative z-10"
            >
                <div className="bg-white/80 backdrop-blur-xl p-10 md:p-12 rounded-[3.5rem] border border-slate-100 shadow-2xl shadow-slate-200/50">
                    <div className="text-center mb-10">
                        <motion.div
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl shadow-lg shadow-blue-600/20 text-white mb-6"
                        >
                            <User size={32} />
                        </motion.div>
                        <h2 className="text-4xl font-bold font-heading text-slate-900 tracking-tight mb-3">
                            Join Our Network
                        </h2>
                        <p className="text-slate-500 font-inter">
                            Create your premium account in seconds
                        </p>
                    </div>

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                className="bg-rose-50 border border-rose-100 text-rose-600 text-sm p-4 rounded-2xl flex items-center gap-2"
                            >
                                <div className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                                {error}
                            </motion.div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="group">
                                <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Full Name</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-600 transition-colors">
                                        <User size={18} />
                                    </div>
                                    <input
                                        name="name"
                                        type="text"
                                        required
                                        className="block w-full pl-11 pr-4 py-4 bg-slate-50 border border-slate-100 text-slate-900 text-sm rounded-2xl focus:ring-4 focus:ring-blue-600/10 focus:border-blue-600 focus:bg-white transition-all outline-none"
                                        placeholder="John Doe"
                                        value={formData.name}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div className="group">
                                <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Email Address</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-600 transition-colors">
                                        <Mail size={18} />
                                    </div>
                                    <input
                                        name="email"
                                        type="email"
                                        required
                                        className="block w-full pl-11 pr-4 py-4 bg-slate-50 border border-slate-100 text-slate-900 text-sm rounded-2xl focus:ring-4 focus:ring-blue-600/10 focus:border-blue-600 focus:bg-white transition-all outline-none"
                                        placeholder="john@example.com"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div className="group">
                                <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Contact No</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-600 transition-colors">
                                        <Phone size={18} />
                                    </div>
                                    <input
                                        name="contact"
                                        type="tel"
                                        required
                                        className="block w-full pl-11 pr-4 py-4 bg-slate-50 border border-slate-100 text-slate-900 text-sm rounded-2xl focus:ring-4 focus:ring-blue-600/10 focus:border-blue-600 focus:bg-white transition-all outline-none"
                                        placeholder="+880 1XXX XXXXXX"
                                        value={formData.contact}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div className="group">
                                <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">NID Number</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-600 transition-colors">
                                        <Fingerprint size={18} />
                                    </div>
                                    <input
                                        name="nid"
                                        type="text"
                                        required
                                        className="block w-full pl-11 pr-4 py-4 bg-slate-50 border border-slate-100 text-slate-900 text-sm rounded-2xl focus:ring-4 focus:ring-blue-600/10 focus:border-blue-600 focus:bg-white transition-all outline-none"
                                        placeholder="1234 5678 90"
                                        value={formData.nid}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="group">
                            <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Secure Password</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-600 transition-colors">
                                    <Lock size={18} />
                                </div>
                                <input
                                    name="password"
                                    type="password"
                                    required
                                    className="block w-full pl-11 pr-4 py-4 bg-slate-50 border border-slate-100 text-slate-900 text-sm rounded-2xl focus:ring-4 focus:ring-blue-600/10 focus:border-blue-600 focus:bg-white transition-all outline-none"
                                    placeholder="Minimum 6 characters with Mix Case"
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100 text-xs text-slate-500 leading-relaxed">
                            <ShieldCheck size={16} className="text-teal-600 shrink-0" />
                            <p>By registering, you agree to our <Link href="/terms" className="text-blue-600 font-bold">Terms of Service</Link> and <Link href="/privacy" className="text-blue-600 font-bold">Privacy Policy</Link>. Your data is encrypted and secure.</p>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="group relative w-full flex justify-center py-4 px-4 bg-slate-900 text-white font-bold rounded-2xl shadow-xl shadow-slate-900/10 hover:shadow-slate-900/20 hover:-translate-y-0.5 transition-all disabled:opacity-70 disabled:translate-y-0"
                        >
                            {isLoading ? (
                                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <span className="flex items-center gap-2">Create Account <ArrowRight size={18} /></span>
                            )}
                        </button>
                    </form>

                    <div className="mt-10">
                        <div className="relative mb-8">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-slate-100"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-4 bg-white text-slate-400 font-medium">Fast Registration</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-4">
                            <button className="w-full flex items-center justify-center gap-3 py-4 px-4 bg-white border border-slate-100 text-slate-700 font-bold rounded-2xl hover:bg-slate-50 transition-all shadow-sm">
                                <Chrome size={18} className="text-slate-900" />
                                Signup with Google
                            </button>
                        </div>
                    </div>

                    <p className="mt-10 text-center text-sm text-slate-500 font-medium">
                        Already have an account?{" "}
                        <Link href="/login" className="text-blue-600 font-bold hover:text-blue-700 transition-colors">
                            Log In Here
                        </Link>
                    </p>
                </div>

                <div className="text-center mt-8 text-slate-400 text-xs font-medium uppercase tracking-widest">
                    &copy; {new Date().getFullYear()} Care.xyz Global • Elite Caregiver Network
                </div>
            </motion.div>
        </div>
    );
}
