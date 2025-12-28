import { MongoClient } from "mongodb";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  if (process.env.NODE_ENV === "production" || process.env.VERCEL) {
    console.error(
      "CRITICAL: MONGODB_URI is missing in production environment!"
    );
  }
}

let cachedClient = null;
let cachedDb = null;

export async function connectDB() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  const isProduction = process.env.NODE_ENV === "production" || process.env.VERCEL;

  if (!MONGODB_URI && isProduction) {
    throw new Error("MONGODB_URI is missing. Please add it to your deployment environment variables (e.g. Vercel dashboard).");
  }

  const uri = MONGODB_URI || "mongodb://localhost:27017/care-xyz";

  try {
    const client = await MongoClient.connect(uri, {
      maxPoolSize: 10,
      minPoolSize: 2,
      connectTimeoutMS: 10000, // 10s timeout
    });

    const db = client.db();
    cachedClient = client;
    cachedDb = db;

    return { client, db };
  } catch (error) {
    console.error("MongoDB Connection Error Detail:", error.message);
    throw new Error(`Database Connection Failed: ${error.message}`);
  }
}

export async function getDB() {
  const { db } = await connectDB();
  return db;
}

export default connectDB;
