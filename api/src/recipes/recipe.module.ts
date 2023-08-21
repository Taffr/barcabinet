import { Module } from '@nestjs/common';
import { RecipeStore } from './recipe.store';
import { RecipeController } from './recipe.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [RecipeController],
  providers: [RecipeStore],
  exports: [RecipeStore],
})
export class RecipeModule {}
