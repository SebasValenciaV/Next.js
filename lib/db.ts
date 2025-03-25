import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/miapp";

if (!MONGODB_URI) {
  throw new Error("Por favor define la variable MONGODB_URI en tu .env local");
}

/**
 * Conecta a la base de datos MongoDB usando Mongoose (singleton)
 */
export async function connectDB() {
  if (mongoose.connection.readyState === 1) {
    // Ya conectado
    return mongoose.connection.asPromise();
  }

  return mongoose.connect(MONGODB_URI);
}
