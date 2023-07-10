import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Ingredient } from '../recipes/interfaces/ingredient.interface';
import * as mongoose from 'mongoose';

@Schema()
export class Recipe {
  @Prop({ type: mongoose.Schema.Types.ObjectId })
  _id: mongoose.Schema.Types.ObjectId;
  @Prop()
  name: string;
  @Prop()
  ingredients: Ingredient[];
  @Prop()
  description: string;
  @Prop()
  garnish?: string;
}

export type RecipeDocument = mongoose.HydratedDocument<Recipe>;
export const RecipeSchema = SchemaFactory.createForClass(Recipe);
