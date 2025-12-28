import { motion } from "framer-motion";
import { Activity, ArrowRight, ChevronRight, Heart, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
const ServiceOverview = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

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
          {!loading &&
            services.map((service) => {
              const iconKey =
                service.id || service.title?.toLowerCase().replace(/\s+/g, "-");
              const { icon: Icon, color } =
                serviceIcons[iconKey] || defaultIcon;
              return (
                <motion.div
                  key={service._id}
                  variants={itemVariants}
                  className="group relative bg-slate-50 rounded-3xl p-2 transition-all duration-500 hover:bg-white hover:shadow-2xl border border-transparent hover:border-slate-100"
                >
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden mb-6">
                    <Image
                      width={800}
                      height={600}
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
                      href={`/services/${service._id}`}
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
  );
};

export default ServiceOverview;
