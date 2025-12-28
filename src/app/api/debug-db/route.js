import { NextResponse } from "next/server";
import { getDB } from "@/lib/db";

export async function GET() {
    try {
        const db = await getDB();
        const dbName = db.databaseName;

        const collections = await db.listCollections().toArray();
        const collectionNames = collections.map(c => c.name);

        const stats = {};
        for (const name of collectionNames) {
            stats[name] = await db.collection(name).countDocuments();
        }

        return NextResponse.json({
            success: true,
            database: dbName,
            collections: collectionNames,
            documentCounts: stats,
            envUri: process.env.MONGODB_URI ? "HIDDEN (Set)" : "NOT SET",
        });
    } catch (error) {
        console.error("DB Debug error:", error);
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}
