"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminRoute({ children }) {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/login?callbackUrl=/admin");
        } else if (status === "authenticated" && session?.user?.role !== "admin") {
            router.push("/");
        }
    }, [status, session, router]);

    if (status === "loading") {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="w-12 h-12 border-4 border-teal-500/20 border-t-teal-500 rounded-full animate-spin" />
            </div>
        );
    }

    if (status === "unauthenticated" || session?.user?.role !== "admin") {
        return null;
    }

    return children;
}
