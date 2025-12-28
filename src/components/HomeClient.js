"use client";

import { useState, useEffect } from "react";
import Hero from "./Hero";
import TrustedIcons from "./TrustedIcons";
import ServicesOverview from "./ServicesOverview";
import WhyUs from "./WhyUs";
import CTA from "./CTA";

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

  return (
    <div className="flex flex-col gap-0 overflow-hidden font-inter">
      <Hero />
      <TrustedIcons />
      <ServicesOverview services={services} loading={loading} />
      <WhyUs />
      <CTA />
    </div>
  );
}
