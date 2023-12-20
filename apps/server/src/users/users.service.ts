import {
  BadRequestException,
  Injectable,
  NotFoundException,
  Logger,
  InternalServerErrorException,
} from '@nestjs/common';
import { ObjectId, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { emailRecoverPassword, emailRegister } from 'src/helpers/emailHelper';
@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  async create(email: string, password: string) {
    this.logger.log(password);
    const existingUser = await this.repo.findOne({ where: { email } });
    if (existingUser) {
      throw new BadRequestException('User already exists');
    }
    const user = await this.repo.create({ email, password });
    await this.repo.save(user);
    try {
      this.logger.log('Sending email');
      await emailRegister(user.email, user.confirmationToken);
    } catch (error) {
      await this.repo.remove(user);
      this.logger.error(String(error));
      throw new InternalServerErrorException('Error sending email');
    }
    return user;
  }

  async findOneId(id: ObjectId) {
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

  async update(id: ObjectId, attrs: Partial<User>) {
    const user = await this.findOneId(id);
    Object.assign(user, attrs);
    return this.repo.save(user);
  }

  async remove(id: ObjectId) {
    const user = await this.findOneId(id);
    return this.repo.remove(user);
  }

  async confirmEmail(token: string, email: string) {
    const user = await this.repo.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException('User not found or invalid token');
    }
    if (user.confirmationToken !== token) {
      throw new BadRequestException('Invalid token');
    }
    user.confirmationToken = '';
    user.isConfirmed = true;
    return this.repo.save(user);
  }

  async requestPasswordRecover(email: string) {
    const user = await this.repo.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    user.confirmationToken = await user.createTempToken();
    await this.repo.save(user);
    await emailRecoverPassword(user.email, user.confirmationToken);
    return user;
  }

  async recoverPassword(token: string, email: string, password: string) {
    const user = await this.repo.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    this.logger.log(token);
    this.logger.log(user.confirmationToken);
    if (user.confirmationToken !== token) {
      throw new BadRequestException('Invalid token');
    }
    user.confirmationToken = '';
    user.password = password;
    return this.repo.save(user);
  }
}
