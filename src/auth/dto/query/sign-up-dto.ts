import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class SignUpDto {
  @ApiProperty({
    type: String,
    description: 'Email of new user',
    required: true,
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    type: String,
    description: 'Password of new user',
    required: true,
  })
  password: string;
}
