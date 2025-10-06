import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";

const registerSchema = z.object({
  name: z.string().min(3, "O nome precisa ter pelo menos 3 caracteres."),
  email: z.string().email("Email inválido."),
  password: z.string().min(6, "A senha precisa ter pelo menos 6 caracteres."),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validation = registerSchema.safeParse(body);

    if (!validation.success) {
      return new NextResponse(JSON.stringify({ error: validation.error.format() }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const { name, email, password } = validation.data;

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return new NextResponse(JSON.stringify({ error: "Este email já está em uso." }), {
        status: 409,
        headers: { "Content-Type": "application/json" },
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    return new NextResponse(JSON.stringify(user), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Erro no registro:", error);
    return new NextResponse(JSON.stringify({ error: "Erro interno do servidor." }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
