import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';


@Injectable()
export class AuthService {

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) { }
  private readonly logger = new Logger(AuthService.name);

  async validateUser(email: string, password: string) {

    const user = await this.usersService.findOneByEmail(email);
    if (!user) {
      this.logger.error(`User not found: ${email}`);
      throw new UnauthorizedException('User not found');
    }

    if (!user.isConfirmed) {
      this.logger.error(`User not confirmed: ${email}`);
      throw new UnauthorizedException('User is not confirmed');
    }

    const passwordMatches = await user.comparePassword(password);

    if (!passwordMatches) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }


  async generateAccessToken(_email: string) {
    const user = await this.usersService.findOneByEmail(_email);
    const payload = { email: user.email, id: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
