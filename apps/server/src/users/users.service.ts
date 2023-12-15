import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  //TODO - remove password from response
  //TODO - Send confirmation email
  //TODO - addToken
  async create(email: string, password: string) {
    const existingUser = await this.repo.findOne({ where: { email } });
    if (existingUser) {
      throw new BadRequestException('User already exists');
    }
    const user = await this.repo.create({ email, password });
    return this.repo.save(user);
  }

  //TODO return JWT token
  async login(email: string, password: string) {
    const user = await this.repo.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const passwordMatch = await user.comparePassword(password);
    if (!passwordMatch) {
      throw new UnauthorizedException('Wrong password');
    }
    if (!user.isConfirmed) {
      throw new UnauthorizedException('User is not confirmed');
    }
    return user;
  }
  findAll() {
    return `This action returns all users`;
  }

  findById(id: number) {
    return `This action returns a #${id} user`;
  }

  findByEmail(email: string) {
    return `This action returns a #${email} user`;
  }

  update(id: number, attrs: Partial<User>) {
    return `This action updates a #${id} ${attrs} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
