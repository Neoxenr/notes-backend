import { Controller, Post, Body } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { SignInDto, SignInResponseDto, SignUpDto } from './dto';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ description: 'Регистрация пользоватея' })
  @Post('signUp')
  async signUp(@Body() dto: SignUpDto): Promise<boolean> {
    return this.authService.signUp(dto);
  }

  @ApiOperation({ description: 'Авторизация пользователя' })
  @Post('signIn')
  async signIn(@Body() dto: SignInDto): Promise<SignInResponseDto> {
    return this.authService.signIn(dto);
  }
}
