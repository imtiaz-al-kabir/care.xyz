import { Outfit, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import SessionWrapper from "@/components/SessionWrapper";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL("http://localhost:3000"),
  title: "Care.xyz - Trusted Care Services",
  description: "Reliable babysitting, elderly care, and patient support services in Bangladesh.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${outfit.variable} ${inter.variable} antialiased min-h-screen flex flex-col font-inter`}
      >
        <SessionWrapper>
          <Navbar />
          <main className="grow">
            {children}
          </main>
          <Footer />
        </SessionWrapper>
      </body>
    </html>
  );
}
