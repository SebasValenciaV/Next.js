import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/user";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();
    if (!email || !password) {
      return NextResponse.json(
        { error: "Todos los campos son obligatorios" },
        { status: 400 }
      );
    }
    await connectDB();
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: "Usuario no encontrado" },
        { status: 400 }
      );
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { error: "Contraseña incorrecta" },
        { status: 401 }
      );
    }
    return NextResponse.json(
      { message: "Inicio de sesión exitoso", userId: user._id.toString(), name: user.name },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error en /api/auth/login:", error);
    return NextResponse.json(
      { error: "Error al iniciar sesión: " + error.message },
      { status: 500 }
    );
  }
}
