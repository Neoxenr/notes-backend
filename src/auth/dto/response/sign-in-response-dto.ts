import { ApiProperty } from '@nestjs/swagger';
import { IsJWT } from 'class-validator';

export class SignInResponseDto {
  @ApiProperty({
    type: String,
    description: 'Sign in response jwt token',
    required: true,
  })
  @IsJWT()
  token: string;
}
