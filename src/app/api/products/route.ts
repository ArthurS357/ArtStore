import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const searchTerm = searchParams.get('search');

  const whereCondition = searchTerm
    ? {
        OR: [
          {
            name: {
              contains: searchTerm,
            },
          },
          {
            description: {
              contains: searchTerm,
            },
          },
        ],
      }
    : {};

  try {
    const products = await prisma.product.findMany({
      where: whereCondition,
    });
    return NextResponse.json(products);
  } catch (error) {
    console.error("Erro na API de busca:", error);
    return new NextResponse('Erro interno do servidor', { status: 500 });
  }
}