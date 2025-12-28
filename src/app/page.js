import HomeClient from "@/components/HomeClient";

export const metadata = {
  title: "Care.xyz | Premium Home Care Services for Your Family",
  description: "Professional, verified, and compassionate home care for babies, elderly, and patients. Experience elite caregiving with Care.xyz. Trusted by 10,000+ happy families.",
  openGraph: {
    title: "Care.xyz | Premium Home Care Services",
    description: "Professional home caregiving services tailored to your family's needs.",
    images: ["/og-image.jpg"],
  },
};

export default function Home() {
  return <HomeClient />;
}
