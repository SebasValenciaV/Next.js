// scripts/seedUsers.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import User from "../models/User.js"; // Ajusta la ruta según la ubicación de tu modelo

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/miapp";

async function seedUsers() {
  try {
    // Conectar a MongoDB
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("Conectado a MongoDB");

    // Arreglo de usuarios a insertar
    const users = [
      { name: "Alice", email: "alice@example.com", password: "password123" },
      { name: "Bob", email: "bob@example.com", password: "password123" },
      { name: "Charlie", email: "charlie@example.com", password: "password123" }
      // Puedes agregar más usuarios aquí
    ];

    // Hashear contraseñas
    const usersToInsert = await Promise.all(
      users.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return { ...user, password: hashedPassword };
      })
    );

    // Insertar usuarios en la colección
    await User.insertMany(usersToInsert);
    console.log("Usuarios insertados correctamente");

    // Cerrar la conexión
    await mongoose.connection.close();
  } catch (error) {
    console.error("Error insertando usuarios:", error);
    await mongoose.connection.close();
  }
}

seedUsers();
