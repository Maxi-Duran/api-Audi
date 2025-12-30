import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  create(createUserDto: CreateUserDto): Promise<User> {
    return this.userRepository.save(createUserDto);
  }

  findAll() {
    return this.userRepository.find();
  }

  findOne(id: number) {
    return this.userRepository.findOneBy({ id });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepository.update(id, updateUserDto);
  }

  remove(id: number) {
    return this.userRepository.delete(id);
  }
  async login(LoginUserDto: LoginUserDto) {
    try {
      const user = await this.userRepository.findOne({
        where: { email: LoginUserDto.email },
      });

      if (user && user.password === LoginUserDto.password) {
        return { id: user.id, email: user.email, role: user.role };
      } else {
        throw new UnauthorizedException('Invalid credentials');
      }
    } catch (err) {
      if (err instanceof UnauthorizedException) {
        throw err;
      }
      throw new InternalServerErrorException('Invalid credentials');
    }
  }
}
