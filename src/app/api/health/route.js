import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";

export async function GET() {
    const diagnostics = {
        env: {
            has_mongodb_uri: !!process.env.MONGODB_URI,
            has_nextauth_url: !!process.env.NEXTAUTH_URL,
            has_nextauth_secret: !!process.env.NEXTAUTH_SECRET,
            node_env: process.env.NODE_ENV,
            is_vercel: !!process.env.VERCEL,
        },
        database: {
            status: "unknown",
            error: null,
        },
        timestamp: new Date().toISOString(),
    };

    try {
        const { client } = await connectDB();
        if (client) {
            diagnostics.database.status = "connected";
        }
    } catch (error) {
        diagnostics.database.status = "failed";
        diagnostics.database.error = error.message;
    }

    return NextResponse.json(diagnostics, {
        status: diagnostics.database.status === "connected" ? 200 : 500
    });
}
