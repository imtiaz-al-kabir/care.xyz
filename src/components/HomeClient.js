"use client";

import { motion } from "framer-motion";
import {
  Activity,
  ArrowRight,
  ChevronRight,
  Clock,
  Heart,
  Phone,
  Shield,
  Star,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function HomeClient() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch("/api/services");
        const data = await response.json();
        setServices(data.slice(0, 3)); // Only show top 3 on home
      } catch (error) {
        console.error("Failed to fetch services:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  const serviceIcons = {
    "baby-care": { icon: Heart, color: "bg-rose-500" },
    "elderly-care": { icon: Users, color: "bg-teal-500" },
    "sick-care": { icon: Activity, color: "bg-blue-600" },
  };

  const defaultIcon = { icon: Heart, color: "bg-teal-500" };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <div className="flex flex-col gap-0 overflow-hidden font-inter">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center bg-white pt-40 pb-20">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-slate-50 z-0 hidden lg:block" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-left"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-50 border border-teal-100 text-teal-700 font-bold text-sm mb-6">
                <span className="flex h-2 w-2 rounded-full bg-teal-500 animate-pulse"></span>
                Trusted by 10,000+ Happy Families
              </div>
              <h1 className="text-6xl md:text-7xl font-bold tracking-tight text-slate-900 leading-[1.1] mb-6 font-heading">
                Professional Care <br />
                <span className="text-transparent bg-clip-text bg-linear-to-r from-teal-600 to-blue-600">
                  For Your Loved Ones
                </span>
              </h1>
              <p className="max-w-xl text-xl text-slate-600 mb-10 leading-relaxed font-inter">
                Experience premium home caregiving services tailored to your
                family's needs. Safe, reliable, and verified experts just a
                click away.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/services"
                  className="px-10 py-4 bg-slate-900 text-white rounded-full font-bold text-lg shadow-2xl shadow-slate-900/20 hover:bg-slate-800 hover:-translate-y-1 transition-all flex items-center gap-2"
                >
                  Book a Service <ArrowRight size={20} />
                </Link>
                <Link
                  href="/services"
                  className="px-10 py-4 bg-white text-slate-900 border border-slate-200 rounded-full font-bold text-lg hover:bg-slate-50 transition-all"
                >
                  View Pricing
                </Link>
              </div>

              <div className="mt-12 flex items-center gap-8 pt-8 border-t border-slate-100">
                <div>
                  <div className="text-2xl font-bold text-slate-900">4.9/5</div>
                  <div className="text-sm text-slate-500 flex gap-1 items-center">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star
                        key={i}
                        size={12}
                        className="fill-yellow-400 text-yellow-400"
                      />
                    ))}
                    User Rating
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-900">100%</div>
                  <div className="text-sm text-slate-500">Verified Experts</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative"
            >
              <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-700">
                <Image
                  width={100}
                  height={100}
                  src="https://images.unsplash.com/photo-1761891954433-4d9664446d27?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Caregiving"
                  className="w-full h-full object-cover scale-110 hover:scale-100 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                <div className="absolute bottom-8 left-8 right-8 bg-white/10 backdrop-blur-xl p-6 rounded-2xl border border-white/20">
                  <div className="flex items-center gap-4 text-white">
                    <div className="w-12 h-12 bg-teal-500 rounded-full flex items-center justify-center font-bold text-xl">
                      98%
                    </div>
                    <div>
                      <div className="font-bold">Customer Satisfaction</div>
                      <div className="text-sm opacity-80">
                        Based on 2.4k reviews
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-teal-500/10 rounded-full blur-3xl -z-1" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl -z-1" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trusted Icons */}
      <div className="bg-slate-50 py-12 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
          <span className="text-xl font-bold text-slate-400 font-heading">
            HEALTH PARTNER
          </span>
          <span className="text-xl font-bold text-slate-400 font-heading">
            TRUST CARE
          </span>
          <span className="text-xl font-bold text-slate-400 font-heading">
            SAFE HOME
          </span>
          <span className="text-xl font-bold text-slate-400 font-heading">
            MEDICLIFE
          </span>
          <span className="text-xl font-bold text-slate-400 font-heading">
            FAMILY FIRST
          </span>
        </div>
      </div>

      {/* Services Overview */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-sm font-bold tracking-widest text-teal-600 uppercase mb-4 px-1">
                Specialized Solutions
              </h2>
              <h3 className="text-4xl md:text-5xl font-bold text-slate-900 font-heading">
                Comprehensive Care for Every Stage of Life
              </h3>
            </div>
            <Link
              href="/services"
              className="text-slate-900 font-bold border-b-2 border-slate-900 pb-1 hover:text-teal-600 hover:border-teal-600 transition-all flex items-center gap-2"
            >
              View all services <ArrowRight size={18} />
            </Link>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {!loading && services.map((service) => {
              const { icon: Icon, color } = serviceIcons[service.id] || defaultIcon;
              return (
                <motion.div
                  key={service.id}
                  variants={itemVariants}
                  className="group relative bg-slate-50 rounded-3xl p-2 transition-all duration-500 hover:bg-white hover:shadow-2xl border border-transparent hover:border-slate-100"
                >
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden mb-6">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  <div className="px-6 pb-8">
                    <div
                      className={`w-14 h-14 ${color} text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-teal-500/10`}
                    >
                      <Icon size={28} />
                    </div>
                    <h4 className="text-2xl font-bold text-slate-900 mb-4 font-heading group-hover:text-teal-600 transition-colors">
                      {service.title}
                    </h4>
                    <p className="text-slate-600 mb-6 leading-relaxed font-inter line-clamp-2">
                      {service.shortDescription}
                    </p>
                    <Link
                      href={`/services/${service.id}`}
                      className="inline-flex items-center gap-2 font-bold text-slate-900 hover:text-teal-600 transition-colors"
                    >
                      Learn more{" "}
                      <ChevronRight
                        size={18}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Why Us Section */}
      <section className="py-32 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-teal-600/10 blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-1/3 h-full bg-blue-600/10 blur-[120px]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-sm font-bold tracking-widest text-teal-400 uppercase mb-4">
                Our Commitment
              </h2>
              <h3 className="text-4xl md:text-5xl font-bold mb-10 font-heading leading-tight">
                Setting the Standard for Premium Care
              </h3>

              <div className="space-y-8">
                {[
                  {
                    title: "Rigorous Verification",
                    desc: "Every caregiver undergoes extensive background checks and health screenings.",
                    icon: Shield,
                  },
                  {
                    title: "Personalized Matching",
                    desc: "We match caregivers based on medical needs, personality, and lifestyle.",
                    icon: Users,
                  },
                  {
                    title: "24/7 Priority Support",
                    desc: "Our care coordinators are available around the clock for total peace of mind.",
                    icon: Clock,
                  },
                  {
                    title: "Seamless Digital Experience",
                    desc: "Easy booking, real-time tracking, and automated payments via Stripe.",
                    icon: Activity,
                  },
                ].map((feature, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    viewport={{ once: true }}
                    className="flex gap-6"
                  >
                    <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center shrink-0 border border-white/10">
                      <feature.icon size={24} className="text-teal-400" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold mb-2 font-heading">
                        {feature.title}
                      </h4>
                      <p className="text-slate-400 leading-relaxed font-inter">
                        {feature.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="relative z-10 p-2 bg-white/5 rounded-[3rem] border border-white/10 backdrop-blur-sm overflow-hidden">
                <Image
                  width={100}
                  height={100}
                  src="https://images.unsplash.com/photo-1761891954433-4d9664446d27?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Care Expert"
                  className="rounded-[2.5rem] w-full shadow-2xl"
                />
              </div>
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-teal-500 rounded-full flex items-center justify-center text-slate-900 font-bold text-center p-4 shadow-2xl z-20 rotate-12">
                Trusted by 10k+ Families
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <div className="bg-linear-to-br from-teal-600 to-blue-700 rounded-[3rem] p-12 md:p-20 text-center text-white relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />

            <h2 className="text-4xl md:text-5xl font-bold mb-8 font-heading">
              Ready to find the perfect care for your family?
            </h2>
            <p className="text-xl opacity-90 mb-12 max-w-2xl mx-auto">
              Join thousands of happy families who trust Care.xyz for their home
              care needs. Schedule your first session in less than 5 minutes.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <Link
                href="/services"
                className="px-10 py-5 bg-white text-slate-900 rounded-full font-bold text-xl shadow-xl hover:bg-slate-50 hover:-translate-y-1 transition-all"
              >
                Get Started Now
              </Link>
              <Link
                href="/services"
                className="px-10 py-5 bg-teal-500 text-white rounded-full font-bold text-xl border border-teal-400 shadow-xl hover:bg-teal-400 transition-all flex items-center gap-2"
              >
                <Phone size={22} /> Talk to an Expert
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
