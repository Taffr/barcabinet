import { After, Before, setWorldConstructor } from '@cucumber/cucumber';
import { AcceptanceWorld } from '../support/world';
import { PrismaService } from '../../../src/prisma/prisma.service';

setWorldConstructor(AcceptanceWorld);

Before(async function () {
  await this.compileWorld();
});

After(async function () {
  const prisma: PrismaService = this.app.get(PrismaService);
  /* Drop tables between tests */
  await prisma.favourite.deleteMany();
  await prisma.savedIngredient.deleteMany();
  await prisma.user.deleteMany();
  await prisma.$disconnect();
});
