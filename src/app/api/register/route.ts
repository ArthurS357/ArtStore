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
      return new NextResponse(JSON.stringify({ error: validation.error.format() }), { status: 400 });
    }

    const { name, email, password } = validation.data;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword
      }
    });

    return NextResponse.json(user);

  } catch (error) {
    // Evita expor o erro em produção, mas loga para debug
    console.error("Erro no registro:", error);
    return new NextResponse("Erro interno do servidor.", { status: 500 });
  }
}
