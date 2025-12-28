import ServiceDetailClient from "@/components/ServiceDetailClient";
import { servicesData } from "@/lib/data";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
    const { id } = await params;
    const service = servicesData.find((s) => s.id === id);

    if (!service) {
        return {
            title: "Service Not Found | Care.xyz",
        };
    }

    return {
        title: `${service.title} | Professional Home Care | Care.xyz`,
        description: `${service.description} Experience elite, verified care for your loved ones with Care.xyz. Starting at $${service.pricePerHour}/hour.`,
        openGraph: {
            title: service.title,
            description: service.description,
            images: [service.image],
        },
    };
}

export default async function ServiceDetailPage({ params }) {
    const { id } = await params;
    const service = servicesData.find((s) => s.id === id);

    if (!service) {
        return notFound();
    }

    return <ServiceDetailClient service={service} />;
}
