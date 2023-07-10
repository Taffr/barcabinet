import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RecipeModule } from './recipes/recipe.module';

@Module({
  imports: [
    RecipeModule,
    MongooseModule.forRoot('mongodb://localhost:27017/barcabinet'),
  ],
})
export class AppModule {}
