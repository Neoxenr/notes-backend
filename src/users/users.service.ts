import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { hash } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}

  async findOne(id: string): Promise<User> {
    return this.usersRepository.findOneOrFail(id);
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<boolean> {
    const hashedPassword: string = await hash(updateUserDto.password, 2);

    const updatedUser: UpdateResult = await this.usersRepository.update(id, {
      ...updateUserDto,
      password: hashedPassword,
    });

    if (!updatedUser.affected) {
      throw new NotFoundException(id);
    }

    return true;
  }

  async remove(id: string): Promise<boolean> {
    await this.usersRepository.delete(id);

    return true;
  }
}
