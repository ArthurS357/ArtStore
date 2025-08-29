import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params; 

  try {
    const product = await prisma.product.findUnique({
      where: { id: id },
    });

    if (!product) {
      // Retorna 404 se o produto não for encontrado
      return new NextResponse('Produto não encontrado', { status: 404 });
    }
    
    // Retorna o produto se encontrado
    return NextResponse.json(product);

  } catch (error) {
    console.error("Erro na API de busca de produto:", error);
    // Retorna um erro genérico do servidor em caso de falha
    return new NextResponse('Erro interno do servidor', { status: 500 });
  }
}