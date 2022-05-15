import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':userId')
  async findOne(@Param('userId', ParseUUIDPipe) userId: string): Promise<User> {
    return this.usersService.findOne(userId);
  }

  @Patch(':userId')
  async update(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.usersService.update(userId, updateUserDto);
  }

  @Delete(':userId')
  async remove(
    @Param('userId', ParseUUIDPipe) userId: string,
  ): Promise<boolean> {
    return this.usersService.remove(userId);
  }
}
