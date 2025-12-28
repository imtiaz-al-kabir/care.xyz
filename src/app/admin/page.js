"use client";

import { motion } from "framer-motion";
import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  Calendar,
  CreditCard,
  DollarSign,
  Search,
  Users,
  Database,
  Loader2
} from "lucide-react";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalBookings: 0,
    totalRevenue: 0,
    totalPayments: 0,
    totalUsers: 0,
  });
  const [loading, setLoading] = useState(true);
  const [seeding, setSeeding] = useState(false);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("/api/admin/stats");
        const data = await response.json();

        if (data.success) {
          setStats(data.stats);
        }
      } catch (error) {
        console.error("Failed to fetch stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const handleRestoreServices = async () => {
    setSeeding(true);
    try {
      const response = await fetch("/api/admin/setup-services", {
        method: "POST",
      });
      const data = await response.json();

      if (response.ok) {
        Swal.fire({
          title: "Success!",
          text: data.message || "Service data has been restored successfully.",
          icon: "success",
          confirmButtonColor: "#0d9488",
        });
      } else {
        throw new Error(data.error || "Failed to restore services");
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: error.message,
        icon: "error",
        confirmButtonColor: "#e11d48",
      });
    } finally {
      setSeeding(false);
    }
  };

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-teal-500/20 border-t-teal-500 rounded-full animate-spin" />
      </div>
    );
  }

  const statCards = [
    {
      label: "Total Bookings",
      value: stats.totalBookings,
      icon: Calendar,
      color: "text-blue-600",
      bg: "bg-blue-50",
      trend: "+12.5%",
      isPositive: true,
    },
    {
      label: "Gross Revenue",
      value: `$${stats.totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: "text-teal-600",
      bg: "bg-teal-50",
      trend: "+8.2%",
      isPositive: true,
    },
    {
      label: "Processed Payments",
      value: stats.totalPayments,
      icon: CreditCard,
      color: "text-indigo-600",
      bg: "bg-indigo-50",
      trend: "-2.4%",
      isPositive: false,
    },
    {
      label: "Active Users",
      value: stats.totalUsers,
      icon: Users,
      color: "text-rose-600",
      bg: "bg-rose-50",
      trend: "+18.1%",
      isPositive: true,
    },
  ];

  return (
    <div className="space-y-10">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-4xl font-bold text-slate-900 font-heading tracking-tight mb-2">
            Executive Overview
          </h1>
          <p className="text-slate-500 font-medium">
            Real-time clinical and financial performance metrics
          </p>
        </div>
        <div className="flex gap-4">
          <div className="relative">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search analytics..."
              className="pl-11 pr-6 py-3 bg-white border border-slate-100 rounded-2xl text-sm focus:ring-4 focus:ring-teal-500/10 outline-none transition-all w-64 shadow-sm"
            />
          </div>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {statCards.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all group"
          >
            <div className="flex justify-between items-start mb-6">
              <div
                className={`w-14 h-14 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform`}
              >
                <stat.icon size={28} />
              </div>
              <div
                className={`flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full ${stat.isPositive
                    ? "bg-emerald-50 text-emerald-600"
                    : "bg-rose-50 text-rose-600"
                  }`}
              >
                {stat.isPositive ? (
                  <ArrowUpRight size={14} />
                ) : (
                  <ArrowDownRight size={14} />
                )}
                {stat.trend}
              </div>
            </div>
            <div>
              <p className="text-slate-400 text-sm font-bold uppercase tracking-widest mb-2">
                {stat.label}
              </p>
              <p className="text-4xl font-bold text-slate-900 font-heading">
                {stat.value}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Detailed Analytics Grid */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Recent Activity Card */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-2 bg-white rounded-[3rem] border border-slate-100 shadow-sm p-10"
        >
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-2xl font-bold text-slate-900 font-heading flex items-center gap-3">
              <Activity className="text-teal-600" /> Recent Network Activity
            </h2>
            <button className="text-sm font-bold text-teal-600 hover:text-teal-700 transition-colors">
              Generate Report
            </button>
          </div>

          <div className="space-y-8">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="flex items-center justify-between group cursor-pointer"
              >
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 group-hover:bg-teal-50 group-hover:text-teal-600 transition-colors">
                    <Users size={20} />
                  </div>
                  <div>
                    <p className="text-slate-900 font-bold">
                      New Booking Request
                    </p>
                    <p className="text-slate-400 text-sm">
                      Gulshan, Dhaka • Premium Baby Care
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-slate-900 font-bold">$120.00</p>
                  <p className="text-slate-400 text-xs">2 hours ago</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* System Health Card */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-slate-900 rounded-[3rem] shadow-xl p-10 text-white overflow-hidden relative"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 blur-[80px] rounded-full translate-x-1/2 -translate-y-1/2" />

          <div className="relative z-10 h-full flex flex-col">
            <div className="mb-10">
              <h2 className="text-2xl font-bold font-heading mb-2">
                Network Status
              </h2>
              <p className="text-teal-400 text-sm font-bold uppercase tracking-widest">
                Operational • 99.9% Uptime
              </p>
            </div>

            <div className="space-y-8 flex-grow">
              <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                <p className="text-white/60 text-xs font-bold uppercase tracking-widest mb-2">
                  Database Cluster
                </p>
                <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                  <div className="bg-teal-400 h-full w-[85%]" />
                </div>
                <div className="flex justify-between mt-2 text-xs font-bold">
                  <span>Primary Node</span>
                  <span>Healthy</span>
                </div>
              </div>

              {/* Restore Service Data Section */}
              <div className="p-6 bg-teal-500/10 rounded-2xl border border-teal-500/20">
                <div className="flex items-center gap-3 mb-4">
                  <Database size={18} className="text-teal-400" />
                  <p className="text-white text-xs font-bold uppercase tracking-widest">
                    Data Recovery
                  </p>
                </div>
                <p className="text-white/60 text-xs mb-4 leading-relaxed">
                  If service cards are missing after deployment, use the button below to restore them to your database.
                </p>
                <button
                  onClick={handleRestoreServices}
                  disabled={seeding}
                  className="w-full py-3 px-4 bg-teal-600 hover:bg-teal-500 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2"
                >
                  {seeding ? (
                    <>
                      <Loader2 size={14} className="animate-spin" />
                      Restoring...
                    </>
                  ) : (
                    "Restore Service Data"
                  )}
                </button>
              </div>
            </div>

            <button className="w-full py-4 px-6 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-sm font-bold transition-all mt-6">
              View System Logs
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
