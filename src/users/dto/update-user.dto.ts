import { IsEmail } from 'class-validator';

export class UpdateUserDto {
  name: string;

  @IsEmail()
  email: string;
}
