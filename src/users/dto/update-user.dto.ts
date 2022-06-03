import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({
    type: String,
    description: 'New user email',
    required: true,
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    type: String,
    description: 'New user password',
    required: true,
  })
  password: string;
}
