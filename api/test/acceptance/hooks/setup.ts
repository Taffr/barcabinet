import { After, Before, setWorldConstructor } from '@cucumber/cucumber';
import { AcceptanceWorld } from '../support/world';
import { PrismaService } from '../../../src/prisma/prisma.service';

setWorldConstructor(AcceptanceWorld);

Before(async function () {
  await this.compileWorld();
});

/*
 * Drop tables between tests,
 * order matters to foreign and primary key constraints.
 * */
After(async function () {
  const prisma: PrismaService = this.app.get(PrismaService);
  await prisma.user.deleteMany();
  await prisma.dosage.deleteMany();
  await prisma.ingredient.deleteMany();
  await prisma.recipe.deleteMany();
  await prisma.$disconnect();
});
