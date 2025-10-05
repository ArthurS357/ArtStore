import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const products = [
  { name: 'Cidade Majestosa', description: 'Uma vista panorâmica de uma cidade moderna ao entardecer.', price: 89.90, imageUrl: '/images/city-sun.jpg' },
  { name: 'Ocean Sereno', description: 'Uma representação tranquila do oceano com tons suaves.', price: 75.50, imageUrl: '/images/ocean-black.jpg' },
  { name: 'Black and White Elegance', description: 'Uma arte minimalista em preto e branco que traz elegância.', price: 99.00, imageUrl: '/images/black-white.jpg' },
  { name: 'Folhetos de Outono', description: 'Papeis japoneses com tema de outono em tons quentes.', price: 89.90, imageUrl: '/images/japanese-papers.jpg' },
  { name: 'Montanhas Tranquilas', description: 'Uma paisagem serena de montanhas sob um céu claro.', price: 75.50, imageUrl: '/images/montains.jpg' },
  { name: 'Grande Construção', description: 'Uma impressionante estrutura arquitetônica que combina modernidade e tradição.', price: 99.00, imageUrl: '/images/big-build.jpg' },
  { name: 'Centro da Cidade', description: 'Uma vista vibrante do centro da cidade com luzes douradas.', price: 110.00, imageUrl: '/images/town-center.jpg' },
  { name: 'Cachorros na Praia', description: 'Dois cachorros brincando alegremente na praia ao pôr do sol.', price: 85.00, imageUrl: '/images/two-dogs.jpg' },
  { name: 'Caminho na Neblina', description: 'Uma trilha misteriosa que desaparece em meio a uma densa neblina.', price: 95.00, imageUrl: '/images/misty-path.jpg' }, 
  { name: 'Aurora Boreal', description: 'O espetáculo de luzes da aurora dançando no céu noturno.', price: 150.00, imageUrl: '/images/aurora-borealis.jpg' } 
];

export async function main() {
  console.log('Start seeding...');

  await prisma.product.deleteMany();

  for (const product of products) {
    await prisma.product.create({ data: product });
  }

  console.log('Seeding finished. 10 products created.');
}


if (require.main === module) {
  main()
    .catch((e) => {
      console.error(e);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}