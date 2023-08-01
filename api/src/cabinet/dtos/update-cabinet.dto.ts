import { IsNumber, IsNotEmpty, IsString } from 'class-validator';

export class UpdateCabinetDTO {
  @IsNotEmpty({ each: true })
  @IsString({ each: true })
  favourites: string[];

  @IsNotEmpty({ each: true })
  @IsNumber({}, { each: true })
  ingredients: number[];
}
