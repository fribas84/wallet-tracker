import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  Logger,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  async create(email: string, password: string) {
    try {
      const existingUser = await this.repo.findOne({ where: { email } });
      if (existingUser) {
        throw new BadRequestException('User already exists');
      }
      const user = await this.repo.create({ email, password });
      return this.repo.save(user);
    } catch (error) {
      this.logger.error(`Failed to create user: ${error.message}`);
      throw new InternalServerErrorException('Failed to create user');
    }
  }

  async findOneId(id: number) {
    try {
      const user = await this.repo.findOne({ where: { id } });
      if (!user) {
        throw new NotFoundException('User not found');
      }
      return user;
    } catch (error) {
      this.logger.error(`Failed to find user: ${error.message}`);
      throw new InternalServerErrorException('Failed to find user');
    }
  }

  async findOneByEmail(email: string) {
    try {
      const user = await this.repo.findOne({ where: { email } });
      if (!user) {
        throw new NotFoundException('User not found');
      }
      return user;
    } catch (error) {
      this.logger.error(`Failed to find user: ${error.message}`);
      throw new InternalServerErrorException('Failed to find user');
    }
  }

  async update(id: number, attrs: Partial<User>) {
    try {
      const user = await this.findOneId(id);
      if (!user) {
        throw new NotFoundException('User not found');
      }
      Object.assign(user, attrs);

      return await this.repo.save(user);
    } catch (error) {
      this.logger.error(`Failed to update user: ${error.message}`);
      throw new InternalServerErrorException('Failed to update user');
    }
  }

  async remove(id: number) {
    try {
      const user = await this.findOneId(id);
      if (!user) {
        throw new NotFoundException('User not found');
      }
      return await this.repo.remove(user);
    } catch (error) {
      this.logger.error(`Failed to remove user: ${error.message}`);
      throw new InternalServerErrorException('Failed to remove user');
    }
  }
}
