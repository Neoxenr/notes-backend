import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { SignInDto, SignInResponseDto, SignUpDto } from './dto';
import { hash, compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(dto: SignUpDto): Promise<boolean> {
    const userIsExist: boolean =
      (await this.usersRepository.count({
        where: { email: dto.email },
      })) > 0;

    if (userIsExist) {
      throw new ConflictException('The user already exists');
    }

    const hashedPassword: string = await hash(dto.password, 2);

    await this.usersRepository.save({
      email: dto.email,
      password: hashedPassword,
    });

    return true;
  }

  async signIn(dto: SignInDto): Promise<SignInResponseDto> {
    const user = await this.usersRepository.findOne({
      where: { email: dto.email },
    });

    if (!user) {
      throw new NotFoundException('The user is not exist');
    }

    const isCorrectPassword = await compare(dto.password, user.password);

    if (!isCorrectPassword) {
      throw new BadRequestException('The password is incorrect');
    }

    const jwtToken = await this.jwtService.signAsync({ sub: user.id });

    return { token: jwtToken };
  }
}
