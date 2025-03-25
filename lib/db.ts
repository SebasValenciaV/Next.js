import mongoose from "mongoose";

if (!process.env.MONGODB_URI) {
  throw new Error("Por favor define la variable MONGODB_URI en tu .env.local");
}
const MONGODB_URI = process.env.MONGODB_URI as string;

/**
 * Conecta a la base de datos MongoDB usando Mongoose (singleton).
 */
export async function connectDB() {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection.asPromise();
  }
  return mongoose.connect(MONGODB_URI);
}
