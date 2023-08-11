import { IsNotEmpty, IsIn, IsString } from 'class-validator';

const updateActions = ['add', 'remove'] as const;

export type UpdateAction = (typeof updateActions)[number];

export class UpdateFavouritesDTO {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsIn(updateActions)
  action: UpdateAction;
}
