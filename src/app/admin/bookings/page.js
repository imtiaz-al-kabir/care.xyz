"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Clock, Search } from "lucide-react";
import { useEffect, useState } from "react";

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch("/api/bookings");
        const data = await response.json();

        if (data.success) {
          setBookings(data.bookings);
        }
      } catch (error) {
        console.error("Failed to fetch bookings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      const response = await fetch(`/api/bookings/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await response.json();

      if (data.success) {
        setBookings(
          bookings.map((b) => (b._id === id ? { ...b, status: newStatus } : b))
        );
      }
    } catch (error) {
      console.error("Failed to update booking:", error);
    }
  };

  const getStatusStyles = (status) => {
    switch (status) {
      case "Confirmed":
        return "bg-teal-50 text-teal-700 border-teal-100";
      case "Pending":
        return "bg-blue-50 text-blue-700 border-blue-100";
      case "Cancelled":
        return "bg-rose-50 text-rose-700 border-rose-100";
      case "Completed":
        return "bg-indigo-50 text-indigo-700 border-indigo-100";
      default:
        return "bg-slate-50 text-slate-700 border-slate-100";
    }
  };

  const filteredBookings = bookings.filter(
    (b) =>
      b.serviceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.district.toLowerCase().includes(searchTerm.toLowerCase())
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
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6">
        <div>
          <h1 className="text-4xl font-bold text-slate-900 font-heading tracking-tight mb-2">
            Service Logistics
          </h1>
          <p className="text-slate-500 font-medium">
            Coordinating specialist deployments across the national network
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4 w-full lg:w-auto">
          <div className="relative flex-grow lg:flex-grow-0 lg:w-80">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search by service or region..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-6 py-3 bg-white border border-slate-100 rounded-2xl text-sm focus:ring-4 focus:ring-teal-500/10 outline-none transition-all shadow-sm"
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden font-inter">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-50 bg-slate-50/50">
                <th className="px-8 py-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  Care Specialist Service
                </th>
                <th className="px-8 py-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-nowrap">
                  Schedule
                </th>
                <th className="px-8 py-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  Global Location
                </th>
                <th className="px-8 py-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  Fee
                </th>
                <th className="px-8 py-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  Status
                </th>
                <th className="px-8 py-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              <AnimatePresence>
                {filteredBookings.length === 0 ? (
                  <tr>
                    <td
                      colSpan="6"
                      className="px-8 py-20 text-center text-slate-400 font-bold font-heading"
                    >
                      No clinical sessions scheduled.
                    </td>
                  </tr>
                ) : (
                  filteredBookings.map((booking, idx) => (
                    <motion.tr
                      key={booking._id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: idx * 0.05 }}
                      className="hover:bg-slate-50/50 transition-colors group"
                    >
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center text-teal-600 shrink-0">
                            <CheckCircle2 size={18} />
                          </div>
                          <span className="text-sm font-bold text-slate-900 max-w-[150px] leading-tight">
                            {booking.serviceName}
                          </span>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-slate-900">
                            {booking.duration} {booking.durationType}
                          </span>
                          <div className="flex items-center gap-1 text-[10px] text-slate-400 font-bold mt-1">
                            <Clock size={10} /> {booking.date}
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-slate-900">
                            {booking.district}
                          </span>
                          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                            {booking.division}
                          </span>
                        </div>
                      </td>
                      <td className="px-8 py-6 text-sm font-bold text-slate-900">
                        ${booking.totalCost}
                      </td>
                      <td className="px-8 py-6">
                        <div
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold border capitalize ${getStatusStyles(
                            booking.status
                          )}`}
                        >
                          {booking.status}
                        </div>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <div className="flex items-center justify-end gap-3">
                          <select
                            value={booking.status}
                            onChange={(e) =>
                              handleStatusUpdate(booking._id, e.target.value)
                            }
                            className="px-4 py-2 bg-slate-100 border-none text-[10px] font-bold text-slate-600 rounded-xl focus:ring-4 focus:ring-teal-500/10 outline-none transition-all cursor-pointer hover:bg-slate-200"
                          >
                            <option value="Pending">Pending</option>
                            <option value="Confirmed">Confirmed</option>
                            <option value="Completed">Completed</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
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
    </div>
  );
}
