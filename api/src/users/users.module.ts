import { Module } from '@nestjs/common';
import { UserStore } from './user.store';
import { UsersController } from './users.controller';
import { FavouritesController } from './favourites.controller';
import { CabinetController } from './cabinet.controller';
import { CabinetStore } from './cabinet.store';
import { FavouritesStore } from './favourites.store';
import { RecipeModule } from '../recipes/recipe.module';

@Module({
  imports: [RecipeModule],
  providers: [UserStore, FavouritesStore, CabinetStore],
  exports: [UserStore],
  controllers: [UsersController, FavouritesController, CabinetController],
})
export class UsersModule {}
