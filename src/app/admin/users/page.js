"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Users,
    Search,
    Mail,
    Phone,
    Shield,
    ShieldCheck,
    ChevronDown,
    MoreHorizontal,
    ArrowUpRight,
    UserCheck
} from "lucide-react";

export default function AdminUsersPage() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch("/api/admin/users");
                const data = await response.json();

                if (data.success) {
                    setUsers(data.users);
                }
            } catch (error) {
                console.error("Failed to fetch users:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const filteredUsers = users.filter(u =>
        u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return (
            <div className="h-full flex items-center justify-center">
                <div className="w-10 h-10 border-4 border-teal-500/20 border-t-teal-500 rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="space-y-10">
            {/* Header Section */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6">
                <div>
                    <h1 className="text-4xl font-bold text-slate-900 font-heading tracking-tight mb-2">Member Registry</h1>
                    <p className="text-slate-500 font-medium">Managing clinical access and secure user credentials</p>
                </div>

                <div className="flex flex-wrap items-center gap-4 w-full lg:w-auto">
                    <div className="relative flex-grow lg:flex-grow-0 lg:w-80">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search by name or email email..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-11 pr-6 py-3 bg-white border border-slate-100 rounded-2xl text-sm focus:ring-4 focus:ring-teal-500/10 outline-none transition-all shadow-sm"
                        />
                    </div>
                </div>
            </div>

            {/* Users Table */}
            <div className="bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden font-inter">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-slate-50 bg-slate-50/50">
                                <th className="px-8 py-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Identified Member</th>
                                <th className="px-8 py-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Contact Information</th>
                                <th className="px-8 py-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-nowrap text-center">Security Level</th>
                                <th className="px-8 py-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Registration</th>
                                <th className="px-8 py-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            <AnimatePresence>
                                {filteredUsers.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="px-8 py-20 text-center text-slate-400 font-bold font-heading">
                                            Zero credentials found.
                                        </td>
                                    </tr>
                                ) : (
                                    filteredUsers.map((user, idx) => (
                                        <motion.tr
                                            key={user._id}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: idx * 0.05 }}
                                            className="hover:bg-slate-50/50 transition-colors group"
                                        >
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center text-white text-sm font-bold shadow-lg shadow-slate-900/10 shrink-0">
                                                        {user.name?.charAt(0) || "U"}
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="text-sm font-bold text-slate-900 leading-none mb-1">{user.name}</span>
                                                        <span className="text-[10px] text-slate-400 font-bold tracking-tight">UUID: {user._id.slice(-12).toUpperCase()}</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="space-y-1">
                                                    <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                                                        <Mail size={12} className="text-slate-300" /> {user.email}
                                                    </div>
                                                    {user.contact && (
                                                        <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                                                            <Phone size={12} className="text-slate-300" /> {user.contact}
                                                        </div>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-8 py-6 text-center">
                                                <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold border capitalize ${user.role === 'admin'
                                                        ? 'bg-amber-50 text-amber-600 border-amber-100'
                                                        : 'bg-emerald-50 text-emerald-600 border-emerald-100'
                                                    }`}>
                                                    {user.role === 'admin' ? <Shield size={12} /> : <UserCheck size={12} />}
                                                    {user.role}
                                                </div>
                                            </td>
                                            <td className="px-8 py-6 text-sm text-slate-500 font-medium">
                                                {new Date(user.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                                            </td>
                                            <td className="px-8 py-6 text-right">
                                                <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all">
                                                    <button className="p-2 text-slate-400 hover:text-teal-600 hover:bg-teal-50 rounded-xl transition-all">
                                                        <ArrowUpRight size={18} />
                                                    </button>
                                                    <button className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-all">
                                                        <MoreHorizontal size={18} />
                                                    </button>
                                                </div>
                                            </td>
                                        </motion.tr>
                                    ))
                                )}
                            </AnimatePresence>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Registry Insights */}
            <div className="grid md:grid-cols-2 gap-8">
                <div className="p-8 bg-slate-900 rounded-[2.5rem] text-white flex items-center justify-between">
                    <div>
                        <p className="text-white/60 text-[10px] font-bold uppercase tracking-widest mb-1">Total Network Reach</p>
                        <h3 className="text-3xl font-bold font-heading">{users.length} Active Members</h3>
                    </div>
                    <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center">
                        <Users size={24} className="text-teal-400" />
                    </div>
                </div>
                <div className="p-8 bg-teal-600 rounded-[2.5rem] text-white flex items-center justify-between shadow-xl shadow-teal-600/20">
                    <div>
                        <p className="text-white/60 text-[10px] font-bold uppercase tracking-widest mb-1">System Verification</p>
                        <h3 className="text-3xl font-bold font-heading">Verified Access</h3>
                    </div>
                    <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center">
                        <ShieldCheck size={24} className="text-white" />
                    </div>
                </div>
            </div>
        </div>
    );
}
