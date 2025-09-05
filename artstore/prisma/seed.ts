import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding...');

  // Deleta todos os produtos existentes para começar do zero
  await prisma.product.deleteMany();

  await prisma.product.create({
    data: {
      name: 'Cidade Majestosa',
      description: 'Uma vista panorâmica de uma cidade moderna ao entardecer.',
      price: 89.90,
      imageUrl: '/images/city-sun.jpg',
    },
  });

  await prisma.product.create({
    data: {
      name: 'Ocean Sereno',
      description: 'Uma representação tranquila do oceano com tons suaves de azul.',
      price: 75.50,
      imageUrl: '/images/ocean-black.jpg',
    },
  });

  await prisma.product.create({
    data: {
      name: 'Black and White Elegance',
      description: 'Uma arte minimalista em preto e branco que traz elegância a qualquer ambiente.',
      price: 99.00,
      imageUrl: '/images/black-white.jpg',
    },
  });

  await prisma.product.create({
    data: {
      name: 'Folhetos de Outono',
      description: 'papeis japoneses com tema de outono, apresentando folhas caídas em tons quentes.',
      price: 89.90,
      imageUrl: '/images/japanese-papers.jpg',
    },
  });

  await prisma.product.create({
    data: {
      name: 'Montanhas Tranquilas',
      description: 'Uma paisagem serena de montanhas sob um céu claro, perfeita para relaxar.',
      price: 75.50,
      imageUrl: '/images/montains.jpg',
    },
  });

  await prisma.product.create({
    data: {
      name: 'Grande Construção',
      description: 'Uma impressionante estrutura arquitetônica que combina modernidade e tradição.',
      price: 99.00,
      imageUrl: '/images/big-build.jpg',
    },
  });

  await prisma.product.create({
    data: {
      name: 'Centro da Cidade ao Entardecer',
      description: 'Uma vista vibrante do centro da cidade com luzes douradas refletindo nos edifícios.',
      price: 110.00,
      imageUrl: '/images/town-center.jpg',
    },
  });

  await prisma.product.create({
    data: {
      name: 'Cachorros na Praia',
      description: 'Dois cachorros brincando alegremente na praia ao pôr do sol.',
      price: 85.00,
      imageUrl: '/images/two-dogs.jpg',
    },
  });


  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
