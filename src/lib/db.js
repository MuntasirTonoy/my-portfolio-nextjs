import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_DIRECT_URI || process.env.MONGO_URI;

// Reuse the connection across hot reloads and serverless invocations.
const cached = (global.mongoose ??= { conn: null, promise: null });

export default async function connectDB() {
  if (!MONGO_URI) {
    throw new Error("MONGO_URI is not set");
  }
  if (cached.conn) return cached.conn;

  // MONGO_DB_NAME overrides the database in the URI path (if any).
  const dbName = process.env.MONGO_DB_NAME || undefined;
  cached.promise ??= mongoose.connect(MONGO_URI, { dbName });

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null;
    throw error;
  }
  return cached.conn;
}
