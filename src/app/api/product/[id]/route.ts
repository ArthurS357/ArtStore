import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    const product = await prisma.product.findUnique({
      where: { id: id },
    });

    if (!product) {
      return new NextResponse('Produto não encontrado', { status: 404 });
    }
    
    return NextResponse.json(product);

  } catch (error) {
    console.error("Erro na API de busca de produto:", error);
    return new NextResponse('Erro interno do servidor', { status: 500 });
  }
}