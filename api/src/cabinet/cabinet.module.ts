import { Module } from '@nestjs/common';
import { CabinetController } from './cabinet.controller';
import { CabinetStore } from './cabinetstore.service';
import { RecipeModule } from '../recipes/recipe.module';

@Module({
  imports: [RecipeModule],
  controllers: [CabinetController],
  providers: [CabinetStore],
  exports: [CabinetStore],
})
export class CabinetModule {}
