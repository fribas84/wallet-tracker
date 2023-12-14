import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  create(email: string, password: string) {
    return `This action adds a new user ${email} ${password}`;
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
