import { Module } from '@nestjs/common';
import { UserStore } from './user.store';
import { UsersController } from './users.controller';
import { FavouritesController } from './favourites.controller';
import { CabinetController } from './cabinet.controller';
import { RecipeModule } from '../recipes/recipe.module';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [RecipeModule, PrismaModule],
  providers: [UserStore],
  exports: [UserStore],
  controllers: [UsersController, FavouritesController, CabinetController],
})
export class UsersModule {}
