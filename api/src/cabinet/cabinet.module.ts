import { Module } from '@nestjs/common';
import { CabinetController } from './cabinet.controller';
import { CabinetStore } from './cabinet.store';
import { RecipeModule } from '../recipes/recipe.module';

@Module({
  imports: [RecipeModule],
  controllers: [CabinetController],
  providers: [CabinetStore],
  exports: [CabinetStore],
})
export class CabinetModule {}
