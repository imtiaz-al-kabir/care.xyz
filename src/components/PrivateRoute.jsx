"use client";

import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

export default function PrivateRoute({ children }) {
    const { data: session, status } = useSession();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (status === "unauthenticated") {
            const callbackUrl = encodeURIComponent(pathname);
            router.push(`/login?callbackUrl=${callbackUrl}`);
        }
    }, [status, router, pathname]);

    if (status === "loading") {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="w-12 h-12 border-4 border-teal-500/20 border-t-teal-500 rounded-full animate-spin" />
            </div>
        );
    }

    if (status === "unauthenticated") {
        return null; // Will redirect via useEffect
    }

    return children;
}
