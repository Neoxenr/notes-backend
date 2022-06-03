import {
  Controller,
  Body,
  Patch,
  Delete,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ description: 'Обновление данных пользователя' })
  @UseGuards(AuthGuard('jwt'))
  @Patch()
  async update(
    @Request() req,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<boolean> {
    return this.usersService.update(req.user.id, updateUserDto);
  }

  @ApiOperation({ description: 'Удаление пользователя' })
  @UseGuards(AuthGuard('jwt'))
  @Delete()
  async remove(@Request() req): Promise<boolean> {
    return this.usersService.remove(req.user.id);
  }
}
