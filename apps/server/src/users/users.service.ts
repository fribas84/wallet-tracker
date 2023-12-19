import {
  BadRequestException,
  Injectable,
  NotFoundException,
  Logger,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { emailRegister } from 'src/helpers/emailHelper';
@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  async create(email: string, password: string) {
    const existingUser = await this.repo.findOne({ where: { email } });
    if (existingUser) {
      throw new BadRequestException('User already exists');
    }

    const user = this.repo.create({ email, password });
    await this.repo.save(user);
    await emailRegister(user.email, user.confirmationToken);
    return user;
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

  async update(id: number, attrs: Partial<User>) {
    const user = await this.findOneId(id);
    Object.assign(user, attrs);
    return this.repo.save(user);
  }

  async remove(id: number) {
    const user = await this.findOneId(id);
    return this.repo.remove(user);
  }

  async confirmEmail(token: string, email: string) {
    const user = await this.repo.findOne({
      where: { confirmationToken: token },
    });
    if (!user) {
      throw new NotFoundException('User not found or invalid token');
    }
    if (user.confirmationToken !== token || user.email !== email) {
      throw new BadRequestException('Invalid token or email');
    }

    user.confirmationToken = '';
    user.isConfirmed = true;
    return this.repo.save(user);
  }
}
