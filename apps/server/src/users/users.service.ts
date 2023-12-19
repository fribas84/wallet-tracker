import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  //TODO - Send confirmation email
  //TODO - UPDATE USER

  async create(email: string, password: string) {
    const existingUser = await this.repo.findOne({ where: { email } });
    if (existingUser) {
      throw new BadRequestException('User already exists');
    }
    const user = await this.repo.create({ email, password });
    return this.repo.save(user);
  }

  async findOneId(id: number) {
    const user = await this.repo.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async findOneByEmail(email: string) {
    const user = await this.repo.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  findAll() {
    return `This action returns all users`;
  }

  update(id: number, attrs: Partial<User>) {
    return `This action updates a #${id} ${attrs} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
