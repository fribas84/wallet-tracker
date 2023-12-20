import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';


@Injectable()
export class AuthService {

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  private readonly logger = new Logger(AuthService.name);

  async validateUser(email: string, password: string) {
    this.logger.log(`Validating user: ${email}`);
    this.logger.log(`Password: ${password}`);
    const user = await this.usersService.findOneByEmail(email);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    if (!user.isConfirmed) {
      throw new UnauthorizedException('User is not confirmed');
    }

    const passwordMatches = await user.comparePassword(password);
    this.logger.log(`Password matches: ${passwordMatches}`);
    if (!passwordMatches) {
      throw new UnauthorizedException('Invalid credentials');
    }

    this.logger.log(`User authenticated: ${email}`);
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
