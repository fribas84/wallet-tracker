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
      console.log(result);
      console.log(password);
      return result;
    }
    return null;
  }

  async generateAccessToken(_email: string) {
    const { email, id  } = await this.usersService.findOneByEmail(_email);
    const payload = { email: email, id: id };
    console.log('payload');
    console.log(payload);
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
