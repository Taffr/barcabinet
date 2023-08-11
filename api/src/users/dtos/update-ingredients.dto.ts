import { IsIn, IsNumber } from 'class-validator';

const updateActions = ['add', 'remove'] as const;

export type UpdateAction = (typeof updateActions)[number];

export class UpdateIngredientsDTO {
  @IsNumber()
  id: number;

  @IsIn(updateActions)
  action: UpdateAction;
}
