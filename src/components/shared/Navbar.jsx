"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronRight, LogOut, User, LayoutDashboard, Briefcase, Home } from "lucide-react";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Hide Navbar on Admin routes
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  const navLinks = [
    { name: "Home", href: "/", icon: Home },
    { name: "Services", href: "/services", icon: Briefcase },
  ];

  if (session?.user) {
    if (session.user.role === "admin") {
      navLinks.push({ name: "Admin", href: "/admin", icon: LayoutDashboard });
    } else {
      navLinks.push({ name: "My Bookings", href: "/my-bookings", icon: Briefcase });
    }
  }

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white/70 backdrop-blur-xl border-b border-gray-200 py-3 shadow-sm"
          : "bg-transparent py-5"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <span className="text-white text-xl font-bold">C</span>
            </div>
            <span className="text-2xl font-bold font-heading tracking-tight text-slate-900">
              Care<span className="text-teal-600">.</span>xyz
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="px-5 py-2 text-slate-600 hover:text-teal-600 font-medium transition-colors relative group"
              >
                {link.name}
                <span className="absolute bottom-0 left-5 right-5 h-0.5 bg-teal-600 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              </Link>
            ))}

            <div className="ml-4 pl-4 border-l border-slate-200 flex items-center gap-4">
              {session ? (
                <div className="flex items-center gap-4">
                  <div className="flex flex-col items-end">
                    <span className="text-sm font-semibold text-slate-900">{session.user.name}</span>
                    <span className="text-xs text-slate-500 capitalize">{session.user.role || 'User'}</span>
                  </div>
                  <button
                    onClick={() => signOut()}
                    className="p-2.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
                    title="Logout"
                  >
                    <LogOut size={20} />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <Link
                    href="/login"
                    className="px-5 py-2 text-slate-600 font-medium hover:text-teal-600 transition-colors"
                    command-identifier="">
                    Login
                  </Link>
                  <Link
                    href="/services"
                    className="px-6 py-2.5 bg-slate-900 text-white rounded-full font-medium shadow-xl shadow-slate-900/10 hover:shadow-slate-900/20 hover:-translate-y-0.5 transition-all"
                  >
                    Get Started
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-4">
            {session && (
              <button className="p-2 text-slate-600 bg-slate-100 rounded-full">
                <User size={20} />
              </button>
            )}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
            >
              {isOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-slate-200 shadow-2xl overflow-hidden"
          >
            <div className="px-4 pt-4 pb-8 space-y-2">
              {navLinks.map((link, idx) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-between p-4 rounded-xl text-slate-700 font-semibold hover:bg-slate-50 hover:text-teal-600 transition-all border border-transparent hover:border-slate-100"
                  >
                    <div className="flex items-center gap-3">
                      <link.icon size={20} className="text-slate-400" />
                      {link.name}
                    </div>
                    <ChevronRight size={18} className="text-slate-300" />
                  </Link>
                </motion.div>
              ))}

              <div className="pt-6 mt-4 border-t border-slate-100 grid grid-cols-2 gap-4">
                {session ? (
                  <button
                    onClick={() => signOut()}
                    className="col-span-2 flex items-center justify-center gap-2 p-4 rounded-xl bg-red-50 text-red-600 font-bold hover:bg-red-100 transition-colors"
                  >
                    <LogOut size={20} /> Logout
                  </button>
                ) : (
                  <>
                    <Link
                      href="/login"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center justify-center p-4 rounded-xl bg-slate-50 text-slate-700 font-bold hover:bg-slate-100 transition-colors"
                      command-identifier="">
                      Login
                    </Link>
                    <Link
                      href="/services"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center justify-center p-4 rounded-xl bg-teal-600 text-white font-bold shadow-lg shadow-teal-500/20 active:scale-95 transition-all"
                    >
                      Get Started
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
