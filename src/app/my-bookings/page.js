"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, MapPin, Clock, DollarSign, AlertCircle, CheckCircle2, XCircle, FileText, ArrowRight, ExternalLink } from "lucide-react";

export default function MyBookingsPage() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const { data: session } = useSession();

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await fetch("/api/bookings");
                const data = await response.json();

                if (data.success) {
                    const userBookings = session?.user?.id
                        ? data.bookings.filter(b => b.userId === session.user.id)
                        : [];
                    setBookings(userBookings);
                }
            } catch (error) {
                console.error("Failed to fetch bookings:", error);
            } finally {
                setLoading(false);
            }
        };

        if (session) {
            fetchBookings();
        } else {
            setLoading(false);
        }
    }, [session]);

    const handleCancel = async (id) => {
        if (confirm("Are you sure you want to cancel this booking?")) {
            try {
                const response = await fetch(`/api/bookings/${id}`, {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ status: "Cancelled" }),
                });

                const data = await response.json();

                if (data.success) {
                    setBookings(bookings.map(b =>
                        b._id === id ? { ...b, status: "Cancelled" } : b
                    ));
                }
            } catch (error) {
                console.error("Failed to cancel booking:", error);
            }
        }
    };

    const getStatusStyles = (status) => {
        switch (status) {
            case "Confirmed": return "bg-teal-50 text-teal-700 border-teal-100 icon-teal";
            case "Pending": return "bg-blue-50 text-blue-700 border-blue-100 icon-blue";
            case "Cancelled": return "bg-rose-50 text-rose-700 border-rose-100 icon-rose";
            default: return "bg-slate-50 text-slate-700 border-slate-100 icon-slate";
        }
    };

    const StatusIcon = ({ status }) => {
        switch (status) {
            case "Confirmed": return <CheckCircle2 size={14} />;
            case "Pending": return <Clock size={14} />;
            case "Cancelled": return <XCircle size={14} />;
            default: return <AlertCircle size={14} />;
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="w-12 h-12 border-4 border-teal-500/20 border-t-teal-500 rounded-full animate-spin" />
            </div>
        );
    }

    if (!session) {
        return (
            <div className="pt-40 pb-40 min-h-screen flex items-center justify-center bg-white px-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="max-w-md w-full text-center p-12 rounded-[3.5rem] bg-slate-50 border border-slate-100"
                >
                    <div className="w-20 h-20 bg-white shadow-xl rounded-3xl flex items-center justify-center mx-auto mb-8 text-rose-500">
                        <AlertCircle size={40} />
                    </div>
                    <h1 className="text-3xl font-bold text-slate-900 mb-4 font-heading tracking-tight">Access Restricted</h1>
                    <p className="text-slate-500 mb-10 font-inter">Please login to your premium account to view your scheduled services.</p>
                    <Link href="/login" className="flex items-center justify-center gap-2 py-5 px-8 bg-slate-900 text-white font-bold rounded-2xl shadow-xl shadow-slate-900/10 hover:shadow-slate-900/20 hover:-translate-y-1 transition-all">
                        Login Now <ArrowRight size={18} />
                    </Link>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="pt-44 pb-32 bg-white min-h-screen font-inter">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16"
                >
                    <div>
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-600 rounded-full text-sm font-bold mb-4">
                            Member Portal
                        </div>
                        <h1 className="text-5xl md:text-6xl font-bold text-slate-900 font-heading tracking-tight">Your Care Hub</h1>
                    </div>
                    <Link href="/services" className="flex items-center gap-2 px-6 py-4 bg-teal-50 text-teal-700 font-bold rounded-2xl hover:bg-teal-100 transition-colors">
                        Book New Service <ArrowRight size={18} />
                    </Link>
                </motion.div>

                {bookings.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="p-16 rounded-[4rem] bg-slate-50 border border-slate-100 text-center"
                    >
                        <div className="w-24 h-24 bg-white shadow-xl rounded-[2rem] flex items-center justify-center mx-auto mb-8 text-slate-300">
                            <Calendar size={48} />
                        </div>
                        <h2 className="text-2xl font-bold text-slate-900 mb-4 font-heading">No Active Bookings</h2>
                        <p className="text-slate-500 mb-10 max-w-sm mx-auto">You haven't scheduled any services yet. Experience elite care by booking a specialist today.</p>
                        <Link href="/services" className="inline-flex items-center justify-center gap-2 py-4 px-10 bg-slate-900 text-white font-bold rounded-2xl shadow-xl shadow-slate-900/10 hover:shadow-slate-900/20 hover:-translate-y-1 transition-all">
                            Browse Services
                        </Link>
                    </motion.div>
                ) : (
                    <div className="grid gap-8">
                        <AnimatePresence>
                            {bookings.map((booking, idx) => (
                                <motion.div
                                    key={booking._id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="group bg-white rounded-[3rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:border-teal-100 transition-all duration-500 overflow-hidden"
                                >
                                    <div className="p-8 md:p-12 flex flex-col lg:flex-row gap-10 items-start lg:items-center">
                                        {/* Visual Lead */}
                                        <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center text-teal-600 shrink-0 shadow-inner group-hover:scale-110 group-hover:bg-teal-50 transition-all duration-500">
                                            <Calendar size={32} />
                                        </div>

                                        {/* Main Info */}
                                        <div className="flex-grow">
                                            <div className="flex flex-wrap items-center gap-4 mb-4">
                                                <h3 className="text-2xl font-bold text-slate-900 font-heading">
                                                    {booking.serviceName}
                                                </h3>
                                                <div className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold border ${getStatusStyles(booking.status)}`}>
                                                    <StatusIcon status={booking.status} />
                                                    {booking.status}
                                                </div>
                                            </div>

                                            <div className="grid md:grid-cols-2 gap-x-12 gap-y-4">
                                                <div className="flex items-center gap-3 text-slate-500">
                                                    <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400">
                                                        <Clock size={16} />
                                                    </div>
                                                    <span className="text-sm font-medium">
                                                        {booking.date} • {booking.duration} {booking.durationType}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-3 text-slate-500">
                                                    <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400">
                                                        <MapPin size={16} />
                                                    </div>
                                                    <span className="text-sm font-medium truncate max-w-[200px]">
                                                        {booking.address}, {booking.division}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Cost & Actions */}
                                        <div className="flex flex-col md:flex-row items-center gap-6 w-full lg:w-auto mt-6 lg:mt-0 pt-8 lg:pt-0 border-t lg:border-t-0 border-slate-50">
                                            <div className="text-center lg:text-right">
                                                <div className="text-[10px] text-slate-400 uppercase tracking-widest font-bold mb-1">Total Premium</div>
                                                <div className="text-3xl font-bold text-slate-900">${booking.totalCost}</div>
                                            </div>
                                            <div className="flex gap-3 w-full md:w-auto">
                                                <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-4 bg-slate-50 text-slate-600 font-bold rounded-2xl hover:bg-slate-100 transition-colors">
                                                    <FileText size={18} /> Invoice
                                                </button>
                                                {booking.status === "Pending" && (
                                                    <button
                                                        onClick={() => handleCancel(booking._id)}
                                                        className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-4 bg-rose-50 text-rose-600 font-bold rounded-2xl hover:bg-rose-100 transition-colors"
                                                    >
                                                        <XCircle size={18} /> Cancel
                                                    </button>
                                                )}
                                                <button className="w-14 h-14 flex items-center justify-center bg-slate-900 text-white rounded-2xl hover:scale-105 transition-transform shadow-xl">
                                                    <ExternalLink size={20} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Subtle Booking ID Bar */}
                                    <div className="px-12 py-3 bg-slate-50/50 border-t border-slate-50 flex justify-between items-center">
                                        <span className="text-[10px] text-slate-400 font-bold tracking-widest">ID: {booking._id}</span>
                                        <span className="text-[10px] text-teal-600 font-bold uppercase">Family Verified Specialist</span>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                )}
            </div>
        </div>
    );
}
