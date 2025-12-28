"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  CalendarCheck,
  ChevronRight,
  CreditCard,
  Globe,
  LayoutDashboard,
  LogOut,
  Menu,
  ShieldCheck,
  Users,
  X,
} from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AdminRoute from "@/components/AdminRoute";

export default function AdminLayout({ children }) {
  return (
    <AdminRoute>
      <AdminLayoutContent children={children} />
    </AdminRoute>
  );
}

function AdminLayoutContent({ children }) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile menu on path change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const navItems = [
    { name: "Back to Website", href: "/", icon: Globe },
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Payments", href: "/admin/payments", icon: CreditCard },
    { name: "Bookings", href: "/admin/bookings", icon: CalendarCheck },
    { name: "Users", href: "/admin/users", icon: Users },
  ];

  const SidebarContent = ({ isMobile = false }) => (
    <div className="flex flex-col h-full">
      {/* Logo Section */}
      <div className="p-8 flex items-center gap-3 overflow-hidden whitespace-nowrap">
        <div className="w-10 h-10 bg-teal-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-teal-600/20 shrink-0">
          <ShieldCheck size={24} />
        </div>
        {(isSidebarOpen || isMobile) && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xl font-bold text-slate-900 font-heading tracking-tight"
          >
            Care.<span className="text-teal-600">Admin</span>
          </motion.span>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-grow px-4 mt-4 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-4 px-4 py-4 rounded-2xl transition-all group relative ${isActive
                  ? "bg-slate-900 text-white shadow-lg shadow-slate-900/10"
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                }`}
            >
              <item.icon
                size={22}
                className={`shrink-0 ${isActive
                    ? "text-teal-400"
                    : "group-hover:text-teal-600 transition-colors"
                  }`}
              />
              {(isSidebarOpen || isMobile) && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="font-bold text-sm"
                >
                  {item.name}
                </motion.span>
              )}
              {isActive && (isSidebarOpen || isMobile) && (
                <motion.div
                  layoutId="active-pill"
                  className="absolute right-4 w-1.5 h-1.5 bg-teal-400 rounded-full"
                />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Sidebar Footer */}
      <div className="p-6 border-t border-slate-100">
        <button
          onClick={() => router.push("/")}
          className="w-full flex items-center gap-4 px-4 py-3 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-2xl transition-all group"
        >
          <LogOut
            size={20}
            className="shrink-0 group-hover:-translate-x-1 transition-transform"
          />
          {(isSidebarOpen || isMobile) && (
            <span className="text-sm font-bold">Exit Portal</span>
          )}
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50/50 flex overflow-hidden font-inter">
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[60] lg:hidden"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-[280px] bg-white z-[70] lg:hidden shadow-2xl"
            >
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-all"
              >
                <X size={20} />
              </button>
              <SidebarContent isMobile={true} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: isSidebarOpen ? 280 : 88 }}
        className="hidden lg:flex flex-col bg-white border-r border-slate-100 h-screen sticky top-0 z-50 transition-all duration-300 shadow-xl shadow-slate-200/20"
      >
        <SidebarContent />

        {/* Toggle Button */}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="absolute -right-3 top-24 w-6 h-6 bg-white border border-slate-100 rounded-full flex items-center justify-center text-slate-400 hover:text-teal-600 shadow-sm transition-colors"
        >
          <ChevronRight
            size={14}
            className={isSidebarOpen ? "rotate-180" : ""}
          />
        </button>
      </motion.aside>

      {/* Main Wrapper */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Header */}
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-100 px-8 flex items-center justify-between sticky top-0 z-40">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 text-slate-500 hover:bg-slate-50 rounded-lg transition-colors"
            >
              <Menu size={24} />
            </button>
            <div className="h-6 w-[1px] bg-slate-200 mx-2 hidden lg:block" />
            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest hidden md:block">
              System Management
            </h2>
          </div>

          <div className="flex items-center gap-6">
            <Link
              href="/"
              className="hidden sm:flex items-center gap-2 px-4 py-2 text-slate-500 hover:text-teal-600 hover:bg-teal-50 rounded-xl transition-all font-bold text-xs group"
            >
              <Globe
                size={16}
                className="group-hover:rotate-12 transition-transform"
              />
              View Website
            </Link>
            <div className="hidden sm:flex flex-col items-end">
              <span className="text-sm font-bold text-slate-900">
                {session?.user?.name}
              </span>
              <span className="text-[10px] text-teal-600 font-bold uppercase tracking-wider">
                Super Administrator
              </span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-white text-xs font-bold shadow-lg shadow-slate-900/10">
              {session?.user?.name?.charAt(0) || "A"}
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-10 lg:p-12 scroll-smooth">
          <AnimatePresence mode="wait">
            <motion.div
              key={pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
