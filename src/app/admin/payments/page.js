"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  CheckCircle2,
  CreditCard,
  Download,
  ExternalLink,
  MoreHorizontal,
  Search,
  ShieldCheck,
} from "lucide-react";
import { useEffect, useState } from "react";

export default function AdminPaymentsPage() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await fetch("/api/admin/payments");
        const data = await response.json();

        if (data.success) {
          setPayments(data.payments);
        }
      } catch (error) {
        console.error("Failed to fetch payments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  const filteredPayments =
    filter === "all" ? payments : payments.filter((p) => p.status === filter);

  const totalProcessed = payments.reduce(
    (acc, curr) => acc + (curr.status === "succeeded" ? curr.amount : 0),
    0
  );

  const getStatusStyles = (status) => {
    switch (status) {
      case "succeeded":
        return "bg-teal-50 text-teal-700 border-teal-100";
      case "pending":
        return "bg-blue-50 text-blue-700 border-blue-100";
      case "failed":
        return "bg-rose-50 text-rose-700 border-rose-100";
      default:
        return "bg-slate-50 text-slate-700 border-slate-100";
    }
  };

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
          <h1 className="text-4xl font-bold text-slate-900 font-heading tracking-tight mb-2 text-3xl">
            Financial Ledger
          </h1>
          <p className="text-slate-500 font-medium">
            Monitoring premium transaction flows and settlement status
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4 w-full lg:w-auto">
          <div className="relative flex-grow lg:flex-grow-0 lg:w-64">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Find payment ID..."
              className="w-full pl-11 pr-6 py-3 bg-white border border-slate-100 rounded-2xl text-sm focus:ring-4 focus:ring-teal-500/10 outline-none transition-all shadow-sm"
            />
          </div>

          <div className="flex items-center gap-2 p-1.5 bg-white border border-slate-100 rounded-2xl shadow-sm">
            {["all", "succeeded", "pending", "failed"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-xl text-xs font-bold capitalize transition-all ${
                  filter === f
                    ? "bg-slate-900 text-white shadow-lg"
                    : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          <button className="p-3 bg-white border border-slate-100 rounded-2xl text-slate-500 hover:text-teal-600 transition-colors shadow-sm group">
            <Download
              size={20}
              className="group-hover:translate-y-0.5 transition-transform"
            />
          </button>
        </div>
      </div>

      {/* Total Highlight */}
      <div className="bg-teal-600 rounded-[2.5rem] p-8 md:p-10 text-white flex flex-col md:flex-row justify-between items-center shadow-2xl shadow-teal-600/20 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 blur-[60px] rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="relative z-10">
          <p className="text-teal-100 text-sm font-bold uppercase tracking-widest mb-2">
            Net Settled Revenue
          </p>
          <h2 className="text-4xl md:text-5xl font-bold font-heading">
            $
            {totalProcessed.toLocaleString(undefined, {
              minimumFractionDigits: 2,
            })}
          </h2>
        </div>
        <div className="relative z-10 mt-6 md:mt-0 flex gap-4">
          <div className="text-right">
            <p className="text-teal-100 text-[10px] font-bold uppercase tracking-widest">
              Active Rate
            </p>
            <p className="text-xl font-bold font-heading">98.2%</p>
          </div>
          <div className="w-[1px] h-10 bg-white/20 mx-2" />
          <div className="text-right">
            <p className="text-teal-100 text-[10px] font-bold uppercase tracking-widest">
              Growth
            </p>
            <p className="text-xl font-bold font-heading">+12%</p>
          </div>
        </div>
      </div>

      {/* Payments Table */}
      <div className="bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden font-inter">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-50 bg-slate-50/50">
                <th className="px-8 py-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  Transaction ID
                </th>
                <th className="px-8 py-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  Premium Service
                </th>
                <th className="px-8 py-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  Settlement
                </th>
                <th className="px-8 py-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  Timestamp
                </th>
                <th className="px-8 py-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              <AnimatePresence>
                {filteredPayments.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-8 py-20 text-center">
                      <div className="flex flex-col items-center">
                        <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-300 mb-4">
                          <CreditCard size={32} />
                        </div>
                        <p className="text-slate-400 font-bold font-heading">
                          Zero transactions detected.
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredPayments.map((payment, idx) => (
                    <motion.tr
                      key={payment._id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: idx * 0.05 }}
                      className="hover:bg-slate-50/50 transition-colors group"
                    >
                      <td className="px-8 py-6">
                        <span className="text-xs font-bold text-slate-900 font-mono bg-slate-100 px-2 py-1 rounded-lg">
                          {payment._id.slice(-12).toUpperCase()}
                        </span>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-teal-50 flex items-center justify-center text-teal-600">
                            <CheckCircle2 size={16} />
                          </div>
                          <span className="text-sm font-bold text-slate-900">
                            {payment.bookingData?.serviceName ||
                              "Specialist Care"}
                          </span>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex flex-col">
                          <span className="text-base font-bold text-slate-900">
                            $
                            {payment.amount.toLocaleString(undefined, {
                              minimumFractionDigits: 2,
                            })}
                          </span>
                          <div
                            className={`mt-1 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold border w-fit capitalize ${getStatusStyles(
                              payment.status
                            )}`}
                          >
                            <div
                              className={`w-1 h-1 rounded-full ${
                                payment.status === "succeeded"
                                  ? "bg-teal-500"
                                  : payment.status === "pending"
                                  ? "bg-blue-500"
                                  : "bg-rose-500"
                              }`}
                            />
                            {payment.status}
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6 text-sm text-slate-500 font-medium">
                        {new Date(payment.createdAt).toLocaleDateString(
                          undefined,
                          { month: "short", day: "numeric", year: "numeric" }
                        )}
                      </td>
                      <td className="px-8 py-6 text-right">
                        <div className="flex items-center justify-end gap-2 translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
                          <button className="p-2.5 text-slate-400 hover:text-teal-600 hover:bg-teal-50 rounded-xl transition-all">
                            <ExternalLink size={18} />
                          </button>
                          <button className="p-2.5 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-all">
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

      {/* Ledger Footer */}
      <div className="flex justify-between items-center text-slate-400 text-xs font-bold tracking-widest uppercase px-4">
        <div className="flex items-center gap-2">
          <ShieldCheck size={14} className="text-teal-600" /> Secure Processing
          Active
        </div>
        <div>Audit Log: {new Date().toLocaleDateString()}</div>
      </div>
    </div>
  );
}
