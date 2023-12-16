import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    console.log('auth.service.ts');
    const user = await this.usersService.findOneByEmail(email);
    if (user && (await user.comparePassword(password))) {
      const { password, ...result } = user;
      console.log('result');
      console.log(password);
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, id: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
