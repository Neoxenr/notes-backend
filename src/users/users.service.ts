import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}

  async findOne(id: string): Promise<User> {
    return this.usersRepository.findOneOrFail(id);
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    await this.usersRepository.update(id, updateUserDto);

    return this.findOne(id);
  }

  async remove(id: string): Promise<boolean> {
    await this.usersRepository.delete(id);

    return true;
  }
}
