import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_DIRECT_URI || process.env.MONGO_URI;

// Reuse the connection across hot reloads and serverless invocations.
const cached = (global.mongoose ??= { conn: null, promise: null });

export default async function connectDB() {
  if (!MONGO_URI) {
    throw new Error("MONGO_URI is not set");
  }
  if (cached.conn) return cached.conn;

  cached.promise ??= mongoose.connect(MONGO_URI);

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null;
    throw error;
  }
  return cached.conn;
}
