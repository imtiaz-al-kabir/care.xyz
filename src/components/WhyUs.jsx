import { motion } from "framer-motion";
import { Activity, Clock, Shield, Users } from "lucide-react";
import Image from "next/image";
const WhyUs = () => {
  return (
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
                width={1200}
                height={1500}
                src="https://images.unsplash.com/photo-1734943842257-268c716c2701?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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
  );
};

export default WhyUs;
