import { IsNotEmpty } from 'class-validator';
export class RegisterUserDTO {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  password: string;
}
