import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';


@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private repo: Repository<User>
  ) {}

  //TODO - add error handling when user exits
  //TODO - remove password from response
  create(email: string, password: string) {
    const user = this.repo.create({ email, password });
    return this.repo.save(user);
  }

  //TODO return JWT token
  async login(email: string, password: string) {
    const user = await this.repo.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const passwordMatch = await user.comparePassword(password);
    console.log("PassworkdMatch: ", passwordMatch);
    if (!passwordMatch) {
      throw new NotFoundException('Wrong password');
    }
    // if (!user.isConfirmed) {
    //   throw new NotFoundException('User not confirmed');
    // }
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
