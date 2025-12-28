"use client";

import Link from "next/link";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Mail, Lock, ArrowRight, Github, Chrome, ShieldCheck } from "lucide-react";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        const result = await signIn("credentials", {
            redirect: false,
            email,
            password,
        });

        if (result?.error) {
            setError("Invalid credentials. Please check your email and password.");
            setIsLoading(false);
        } else {
            router.push("/my-bookings");
            router.refresh();
        }
    };

    const handleGoogleLogin = () => {
        signIn("google", { callbackUrl: "/my-bookings" });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-white relative overflow-hidden pt-44 pb-20">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-full bg-slate-50/50" />
            <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-teal-500/5 blur-[120px] rounded-full" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/5 blur-[120px] rounded-full" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-md w-full mx-4 relative z-10"
            >
                <div className="bg-white/80 backdrop-blur-xl p-10 md:p-12 rounded-[3rem] border border-slate-100 shadow-2xl shadow-slate-200/50">
                    <div className="text-center mb-10">
                        <motion.div
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            className="inline-flex items-center justify-center w-16 h-16 bg-teal-500 rounded-2xl shadow-lg shadow-teal-500/20 text-white mb-6"
                        >
                            <ShieldCheck size={32} />
                        </motion.div>
                        <h2 className="text-4xl font-bold font-heading text-slate-900 tracking-tight mb-3">
                            Welcome Back
                        </h2>
                        <p className="text-slate-500 font-inter">
                            Securely access your Care.xyz portal
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

                        <div className="space-y-4">
                            <div className="group">
                                <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Email Address</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-teal-500 transition-colors">
                                        <Mail size={18} />
                                    </div>
                                    <input
                                        type="email"
                                        required
                                        className="block w-full pl-11 pr-4 py-4 bg-slate-50 border border-slate-100 text-slate-900 text-sm rounded-2xl focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 focus:bg-white transition-all outline-none"
                                        placeholder="user@example.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="group">
                                <div className="flex justify-between items-center mb-2 ml-1">
                                    <label className="block text-sm font-bold text-slate-700">Password</label>
                                    <Link href="#" className="text-sm font-bold text-teal-600 hover:text-teal-700 transition-colors">Forgot?</Link>
                                </div>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-teal-500 transition-colors">
                                        <Lock size={18} />
                                    </div>
                                    <input
                                        type="password"
                                        required
                                        className="block w-full pl-11 pr-4 py-4 bg-slate-50 border border-slate-100 text-slate-900 text-sm rounded-2xl focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 focus:bg-white transition-all outline-none"
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="group relative w-full flex justify-center py-4 px-4 bg-slate-900 text-white font-bold rounded-2xl shadow-xl shadow-slate-900/10 hover:shadow-slate-900/20 hover:-translate-y-0.5 transition-all disabled:opacity-70 disabled:translate-y-0"
                        >
                            {isLoading ? (
                                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <span className="flex items-center gap-2">Sign In <ArrowRight size={18} /></span>
                            )}
                        </button>
                    </form>

                    <div className="mt-10">
                        <div className="relative mb-8">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-slate-100"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-4 bg-white text-slate-400 font-medium">Secure Social Login</span>
                            </div>
                        </div>

                        <button
                            onClick={handleGoogleLogin}
                            className="w-full flex items-center justify-center gap-3 py-4 px-4 bg-white border border-slate-100 text-slate-700 font-bold rounded-2xl hover:bg-slate-50 transition-all shadow-sm"
                        >
                            <Chrome size={18} className="text-slate-900" />
                            Continue with Google
                        </button>
                    </div>

                    <p className="mt-10 text-center text-sm text-slate-500 font-medium">
                        New to Care.xyz?{" "}
                        <Link href="/register" className="text-teal-600 font-bold hover:text-teal-700 transition-colors">
                            Create Premium Account
                        </Link>
                    </p>
                </div>

                {/* Footer Link */}
                <div className="text-center mt-8 text-slate-400 text-xs font-medium uppercase tracking-widest">
                    &copy; {new Date().getFullYear()} Care.xyz Global • Trusted Care Network
                </div>
            </motion.div>
        </div>
    );
}
