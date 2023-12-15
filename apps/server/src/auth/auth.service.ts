import { Injectable } from '@nestjs/common';

import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async login(email: string, password: string) {
    console.log('auth.service.ts');
    const user = await this.usersService.findOneByEmail(email);

    if (user && (await user.comparePassword(password))) {
      const { password, ...result } = user;
      console.log('result');
      console.log(password);
      return result;
    }

    return user;
  }
}
