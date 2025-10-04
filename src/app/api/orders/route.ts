import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import prisma from '@/lib/prisma';
import { CartItem } from '@/lib/types';

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session || !(session.user as any)?.id) {
    return new NextResponse('Não autorizado', { status: 401 });
  }
  const userId = (session.user as any).id;
  const body = await request.json();
  const { cartItems, totalCost } = body;

  if (!cartItems || cartItems.length === 0 || !totalCost) {
    return new NextResponse('Dados inválidos', { status: 400 });
  }

  try {
    const newOrder = await prisma.order.create({
      data: {
        userId: userId,
        amount: totalCost,
        items: {
          create: cartItems.map((item: CartItem) => ({
            productId: item.id,
            quantity: item.quantity,
          })),
        },
      },
      include: {
        items: true, 
      },
    });

    return NextResponse.json(newOrder, { status: 201 });
  } catch (error) {
    console.error("Erro ao criar pedido:", error);
    return new NextResponse('Erro interno do servidor', { status: 500 });
  }
}

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session || !(session.user as any)?.id) {
    return new NextResponse('Não autorizado', { status: 401 });
  }
  const userId = (session.user as any).id;

  try {
    const orders = await prisma.order.findMany({
      where: {
        userId: userId,
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(orders);
  } catch (error) {
    console.error("Erro ao buscar histórico de pedidos:", error);
    return new NextResponse('Erro interno do servidor', { status: 500 });
  }
}