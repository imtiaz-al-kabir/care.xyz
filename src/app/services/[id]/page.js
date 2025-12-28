import ServiceDetailClient from "@/components/ServiceDetailClient";
import { getServiceById } from "@/lib/collections/services";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
    const { id } = await params;
    const service = await getServiceById(id);

    if (!service) {
        return {
            title: "Service Not Found | Care.xyz",
        };
    }

    return {
        title: `${service.title} | Professional Home Care | Care.xyz`,
        description: `${service.shortDescription} Experience elite, verified care for your loved ones with Care.xyz. Starting at $${service.pricePerHour}/hour.`,
        openGraph: {
            title: service.title,
            description: service.shortDescription,
            images: [service.image],
        },
    };
}

export default async function ServiceDetailPage({ params }) {
    const { id } = await params;
    const service = await getServiceById(id);

    if (!service) {
        return notFound();
    }

    return <ServiceDetailClient service={service} />;
}
