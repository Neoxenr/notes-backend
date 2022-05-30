import { IsJWT } from 'class-validator';

export class SignInResponseDto {
  @IsJWT()
  token: string;
}
